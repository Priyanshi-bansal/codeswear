import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  useEffect(()=>{
    console.log("Hey I am a useEffect from _app.js")
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear()
    }
  }, [])


  const saveCart = (myCart) =>{
    localStorage.setItem("cart",  myCart)
    let subt = 0;
    let keys = Object.keys(cart)
    for(let i = 0; keys.length;i++){
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }


  const addtoCart = (itemCode, qty, price, name, size, varient)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] = {qty:1, price, name, size, varient}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = ()=>{
    setcart({})
    saveCart({})
  }

  const removeFromCart= (itemCode, qty, price, name, size, varient) =>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode].qty <= 0){
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }
  return <>
  <Navbar  cart={cart} addToCart={ addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
  <Component cart={cart} addToCart={ addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />;
  <Footer />
  </>
  
}
