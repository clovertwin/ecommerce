import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantitys } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">AccessoryShack</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantitys}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
