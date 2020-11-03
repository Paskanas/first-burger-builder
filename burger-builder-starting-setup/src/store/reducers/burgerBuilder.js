import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utils";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.1,
  cheese: 0.7,
  falafel: 0.5,
  bacon: 0.8,
};

const reducer = (state = initialState, action) => {
  const updatedIngredient = (addValue) => {
    return {
      [action.ingredientName]:
        state.ingredients[action.ingredientName] + addValue,
    };
  };
  const updatedIngredients = (addValueBoolean) =>
    updateObject(
      state.ingredients,
      updatedIngredient(addValueBoolean ? 1 : -1)
    );
  const addRemoveIngredient = (addValueBoolean) => {
    return {
      ingredients: updatedIngredients(addValueBoolean),
      totalPrice: addValueBoolean
        ? state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      building: true,
    };
  };

  const setIngredients = {
    salad: action.ingredients ? action.ingredients.salad : 0,
    bacon: action.ingredients ? action.ingredients.bacon : 0,
    cheese: action.ingredients ? action.ingredients.cheese : 0,
    falafel: action.ingredients ? action.ingredients.falafel : 0,
  };
  const setIngredientsState = (state) => {
    return updateObject(state, {
      ingredients: setIngredients,
      totalPrice: 4,
      error: false,
      building: false,
    });
  };

  const fetchIngredientsFail = (state) => {
    return updateObject(state, { error: true });
  };
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return updateObject(state, addRemoveIngredient(true));
    case actionTypes.REMOVE_INGREDIENTS:
      return updateObject(state, addRemoveIngredient(false));
    case actionTypes.SET_INGREDIENTS:
      return setIngredientsState(state);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFail(state);
    default:
      return state;
  }
};

export default reducer;
