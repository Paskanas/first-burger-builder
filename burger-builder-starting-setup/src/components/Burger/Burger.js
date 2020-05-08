import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const burger = (props) => {
  let transformedIngriedients = Object.keys(props.ingriedients)
    .map((igKey) => {
      return [...Array(props.ingriedients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + 1} type={igKey} />;
      }); //array with 2 elements
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngriedients.length === 0) {
    transformedIngriedients = <p>Please start adding ingerdients!</p>;
  }
  console.log(transformedIngriedients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {transformedIngriedients}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  );
};

export default burger;
