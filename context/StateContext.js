import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantitys, setTotalQunatitys] = useState(0);
  const [qty, setqty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQunatitys((prev) => prev + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQunatitys((prev) => prev - foundProduct.quantity);
    setCartItems(cartItems.filter((item) => item._id !== product._id));
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);
    let updatedItems;
    if (value === "inc") {
      const updatedItem = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };
      updatedItems = [...cartItems];
      updatedItems[index] = updatedItem;
      setCartItems([...updatedItems]);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQunatitys((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        const updatedItem = {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        };
        updatedItems = [...cartItems];
        updatedItems[index] = updatedItem;
        setCartItems([...updatedItems]);
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQunatitys((prev) => prev - 1);
      }
    }
  };

  const incQty = () => {
    setqty((prev) => prev + 1);
  };

  const decQty = () => setqty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantitys,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
