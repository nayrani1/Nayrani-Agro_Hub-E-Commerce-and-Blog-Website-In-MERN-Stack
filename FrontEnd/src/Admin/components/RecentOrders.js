import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBTypography } from "mdbreact";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  RecentOrdersAction,
  clearErrors,
} from "../../Redux/Actions/OrderActions";

const RecentOrders = () => {
  const { error, orders } = useSelector((state) => state.RecentOrder);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  useEffect(() => {
    dispatch(RecentOrdersAction());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <div>
      <MDBRow>
        <MDBCol>
          <MDBCard >
            <MDBCardHeader className="recent-order-card-header" >
              <MDBTypography
                tag="h6"
                className="mb-0"
                style={{ textShadow: "1px 1px 0px #00e476" }}
              >
                Recent Orders 
              </MDBTypography>
              <MDBTypography
                tag="p"
                className="mb-0"
                style={{ color:"#34495E", cursor: "pointer" }}
                onclick={()=>navigate("/admin/all/orders")}
              >
                See more
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable className="mb-0">
                <MDBTableHead>
                  <tr>
                    <th scope="col"  >
                      Date
                    </th>
                    <th scope="col"  >
                      Name
                    </th>
                    <th scope="col"  >
                      Ship To
                    </th>
                    <th scope="col"  >
                      Amount
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {orders &&
                    orders.map((order) => (
                      <tr>
                        <td>
                          {new Intl.DateTimeFormat("en", {
                            month: "long",
                          }).format(new Date(order.createdAt))}{" "}
                          {new Date(order.createdAt).getDate()}{" "}
                          {new Date(order.createdAt).getFullYear()}
                        </td>
                        <td>
                          <div>
                            <p className="text-muted mb-0">{order.user.name}</p>
                          </div>
                        </td>
                        <td>
                          <p className="text-muted mb-0">
                            {order.shippingInfo.city}
                          </p>
                        </td>
                        <td>
                          <p className="text-muted mb-0">${order.totalPrice}</p>
                        </td>
                      </tr>
                    ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default RecentOrders;
