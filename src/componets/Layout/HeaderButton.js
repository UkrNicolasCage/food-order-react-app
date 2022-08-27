import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderButton.module.css";

const HeaderButton = (props) => {
  const [btnHighLighted, setBtnHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = cartCtx.items.reduce((acc, item) => {
    return (acc += item.amount);
  }, 0);

  const btnClasses = `${classes.button} ${btnHighLighted && classes.bump}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnHighLighted(true);

    const timer = setTimeout(()=>{
      setBtnHighLighted(false);
    }, 300)

    return () => {clearTimeout(timer)};
  }, [items, cartCtx.items.length]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderButton;
