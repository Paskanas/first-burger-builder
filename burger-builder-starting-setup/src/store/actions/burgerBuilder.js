import * as actionTypes from "./actionTypes";
import axios from "../../axies-order";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return { type: actionTypes.SET_INGREDIENTS, ingredients: ingredients };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const fetchIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-burger-builder-aa98c.firebaseio.com/ingredients.json")
      .then((response) => {
        console.log("response", response);
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(fetchIngredientsFailed());
      });
  };
};

export const puchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
