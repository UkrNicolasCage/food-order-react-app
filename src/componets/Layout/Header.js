import React from "react";
import classes from "./Header.module.css";
import HeaderButton from "./HeaderButton.js";
import mealsImage from "../..//assets/meals.jpg";



const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
