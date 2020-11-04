import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../common/utils";

const initialState = {
  loading: false,
  orders: [],
  purchased: false,
};

const fetchOrdersInit = (state) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersFail = (state) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    order: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state) => {
  return updateObject(state, { loading: false });
};
const purchaseBurgerStart = (state) => {
  return updateObject(state, { loading: true });
};

const purchaseInit = (state) => {
  return updateObject(state, { purchased: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_INIT:
      return fetchOrdersInit(state);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.PURCHASE_BURDER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    default:
      return state;
  }
};

export default reducer;
