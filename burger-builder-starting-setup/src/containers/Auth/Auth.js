import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorMessages from "./errorMessages";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../common/utils";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email adress",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        name: "Email",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        name: "Password",
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedConrols = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedConrols });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
          touched={formElement.config.touched}
          name={formElement.config.name}
        />
      );
    });
    const inputForm = this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {form}
        <Button btnType="Success">
          {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
        </Button>
      </div>
    );

    const errorMessage = this.props.error ? (
      <p className={classes.ValidationError}>
        {errorMessages(this.props.error.message)}
      </p>
    ) : null;

    const authRedirect = this.props.isAuth ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : null;

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {/**It is for do net let submit form if form is invalid */}
        <form onSubmit={this.submitHandler}>{inputForm}</form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {this.state.isSignUp ? "SWITCH TO SIGNIN" : "SWITCH TO SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRederectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
