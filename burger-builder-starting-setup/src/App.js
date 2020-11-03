import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignin();
  }
  render() {
    const routes = this.props.isAuthenticated ? (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    ) : (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    );

    return (
      <div>
        <Layout>
          {/* <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route render={() => <h1>Page not found</h1>} /> */}
          {routes}
        </Layout>
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
