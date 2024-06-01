import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function ChartLine() {
    
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [1, 3, 2, 4, 2, 3],
          area: true,
          color: '#00bf63', // Green with 50% opacity
        },
      ]}
      width={500}
      height={300}
      />
  );
}
