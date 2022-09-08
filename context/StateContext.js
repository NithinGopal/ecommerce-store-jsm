//# a central location that passes data/state/context across the site

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {

  //# declare all the state variables with initial values
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  //# Add to cart function
  const onAdd = (product, quantity) => {

    //@ check if the product is already in the cart
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    //@ update total price of the added product as per quantity in the cart 
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

    //@ update quantity of each product added
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    //@ if the produc is already in the cart
    if(checkProductInCart) {
      //@ update quantity of the cart items
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      //@ update the state for the cartItems
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      //@ update the cartItems state with the new product with quantity
      setCartItems([...cartItems, { ...product }]);
    }

    //@ a toast notification to inform user that the product is added to cart
    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  //@ remove items from the cart function
  const onRemove = (product) => {
    //@ find the product clicked to remove
    foundProduct = cartItems.find((item) => item._id === product._id);
    //@ filter the clicked item from cartItems and return the rest
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    //@ update total price and total quantities
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);

    //@ update cartItems state with filtered items
    setCartItems(newCartItems);
  }

  //@ increase or decrease product quantity in the cart and update total price
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  //@ increase or decrease quantity in the product page
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        setCartItems,
        setTotalPrice,
        setTotalQuantities, 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);