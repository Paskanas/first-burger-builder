import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //This could be a functional component, doesn't have to be class
  componentWillUpdate() {}

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capatalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3> Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {this.props.totalPrice} Eur</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.cancelPurchase} btnType="Danger">
          CANCEL
        </Button>
        {/* <NavLink to="/Checkout"> */}
        <Button btnType="Success" clicked={this.props.continuePurchase}>
          CONTINUE
        </Button>
        {/* </NavLink> */}
      </Aux>
    );
  }
}

export default OrderSummary;
