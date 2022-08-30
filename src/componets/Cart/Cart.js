import React, { useContext, useEffect, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem.js";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout.js";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const CartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const CartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={CartItemRemoveHandler.bind(null, item.id)}
            onAdd={CartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  useEffect(() => {
    if (cartItems.props.children.length === 0) {
      setIsCheckout(false);
    }
  }, [cartItems]);
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const submitOrderHandler = async (data) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-2fb63-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onCloseCart} />
      ) : (
        modalActions
      )}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmittingModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <button className={classes['close-modal']} onClick={props.onCloseCart}>
        Buy More
      </button>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
