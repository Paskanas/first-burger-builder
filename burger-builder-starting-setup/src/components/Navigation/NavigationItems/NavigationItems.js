import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  const authNavigationItems = props.isAuth ? (
    <NavigationItem link={"/logout"} active>
      Logout
    </NavigationItem>
  ) : (
    <NavigationItem link={"/auth"} active>
      Log in
    </NavigationItem>
  );
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={"/"} exact>
        Burger Builder
      </NavigationItem>
      {props.isAuth ? (
        <NavigationItem link={"/orders"} active>
          Orders
        </NavigationItem>
      ) : null}
      {authNavigationItems}
    </ul>
  );
};

export default navigationItems;
