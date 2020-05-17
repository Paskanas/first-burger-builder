import React from "react";
import classes from "./Button.css";

const button = (props) => {
  console.log(props.btnType);
  console.log([classes.Button, props.btnType].join(" "));
  return (
    <button
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default button;
