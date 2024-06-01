import * as React from "react";
import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const chartSetting = {
  yAxis: [
    {
      label: "Sales (USD)",
    },
  ],
  width: 635,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-5px, 0)",
    },
  },
};

const valueFormatter = (value) => `${value} USD`;

const processSalesData = (orders, view) => {
  const now = dayjs();

  if (view === "last7days") {
    const lastWeek = now.subtract(7, "day");
    const salesByDay = {};

    orders.forEach((order) => {
      const orderDate = dayjs(order.createdAt);
      if (orderDate.isAfter(lastWeek)) {
        const day = orderDate.format("YYYY-MM-DD");
        salesByDay[day] = (salesByDay[day] || 0) + order.totalPrice;
      }
    });

    return Object.keys(salesByDay)
      .sort() // Ensure the days are sorted chronologically
      .map((day) => ({
        day,
        Sales: salesByDay[day],
      }));
  } else if (view === "monthly") {
    const salesByMonth = {};

    orders.forEach((order) => {
      const month = dayjs(order.createdAt).format("MMM");
      salesByMonth[month] = (salesByMonth[month] || 0) + order.totalPrice;
    });

    return Object.keys(salesByMonth).map((month) => ({
      month,
      Sales: salesByMonth[month],
    }));
  } else if (view === "weekly") {
    const salesByWeek = {};

    orders.forEach((order) => {
      const week = dayjs(order.createdAt).isoWeek();
      const year = dayjs(order.createdAt).year();
      const weekKey = `${year}-W${week}`;

      salesByWeek[weekKey] = (salesByWeek[weekKey] || 0) + order.totalPrice;
    });

    return Object.keys(salesByWeek)
      .sort()
      .map((week) => ({
        week,
        Sales: salesByWeek[week],
      }));
  }
  return [];
};

export default function Chart({ orders }) {
  const [dataset, setDataset] = useState([]);
  const [view, setView] = useState("last7days");

  useEffect(() => {
    setDataset(processSalesData(orders, view));
  }, [orders, view]);

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <select class="custom-select" value={view} onChange={handleViewChange}>
          <option value="last7days">Last 7 Days</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey:
              view === "monthly" ? "month" : view === "weekly" ? "week" : "day",
          },
        ]}
        series={[
          {
            dataKey: "Sales",
            label: "Product Sales",
            valueFormatter,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
