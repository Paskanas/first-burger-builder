import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  console.log("props.isAuth", props.isAuth);
  const authNavigationItems = props.isAuth ? (
    <NavigationItem link={"/logout"} active>
      Logout
    </NavigationItem>
  ) : (
    <NavigationItem link={"/auth"} active>
      Authenticate
    </NavigationItem>
  );
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={"/"} exact>
        Burger Builder
      </NavigationItem>
      {props.isAuth ? (
        <NavigationItem link={"/orders"} active>
          Checkout
        </NavigationItem>
      ) : null}
      {authNavigationItems}
    </ul>
  );
};

export default navigationItems;
