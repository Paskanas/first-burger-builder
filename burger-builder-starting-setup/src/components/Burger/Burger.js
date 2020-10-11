import React from "react";
// import { withRouter } from "react-router-dom";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const burger = (props) => {
  console.log("burger -> props", props);
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      }); //array with 2 elements
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  console.log(
    "burger -> transformedIngredients.length",
    transformedIngredients.length
  );
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingerdients!</p>;
  }
  console.log("burger -> transformedIngredients1", transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {console.log("burger -> transformedIngredients", transformedIngredients)}
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  );
};

export default burger;
// export default withRouter(burger);
