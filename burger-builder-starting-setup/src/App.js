import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Logout from "./containers/Auth/Logout/Logout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
// TODO find out differences
// const asyncCheckout = React.lazy(() => {
//   import("./containers/Checkout/Checkout");
// });

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
// TODO find out differences
// const asyncOrders2 = React.lazy(() => {
//   import("./containers/Orders/Orders");
// });

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
// TODO find out differences
// const asyncAuth2 = React.lazy(() => {
//   import("./containers/Auth/Auth");
// });

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignin();
  }
  render() {
    const routes = this.props.isAuthenticated ? (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" exact component={asyncOrders} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/auth" exact component={asyncAuth} />{" "}
        <Route path="/" exact component={BurgerBuilder} />
        {/**
         * It is for redirecting to main page after login
         * */}
        <Redirect to="/" />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    ) : (
      <Switch>
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState()),
  };
};

// export default connect(null, mapDispatchToProps)(App);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
