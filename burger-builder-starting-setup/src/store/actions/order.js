import * as actionTypes from "./actionTypes";
import axios from "../../axies-order";

export const purchaseBurgerSuccess = (id, orderData) => {
  console.log("purchaseBurgerSuccess -> orderData", orderData);

  return {
    type: actionTypes.PURCHASE_BURDER_SUCCESS,
    orderId: id,
    orders: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error: error };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const fetchOrdersSuccess = (fetchedOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: fetchedOrders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    console.log("before fetchOrdersInit");
    dispatch(fetchOrdersInit());
    console.log("after fetchOrdersInit");
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => dispatch(fetchOrdersFail(err)));
  };
};

export const puchaseBurger = (orderData) => {
  console.log("puchaseBurger -> orderData", orderData);
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log("response.data.name", response.data.name);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        // this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        dispatch(purchaseBurgerFail(error));
      });
  };
};
