import { useState } from "react";

import Header from "./componets/Layout/Header.js";
import Meals from "./componets/Meals/Meals.js";
import Cart from "./componets/Cart/Cart.js";
import CartProvider from "./store/CartProvider.js";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const toggleCartHandler = () =>{
    setCartIsShown(!cartIsShown);
  }
  
  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={toggleCartHandler} />}
      <Header onShowCart={toggleCartHandler} />
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
