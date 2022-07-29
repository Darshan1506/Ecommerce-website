import './App.css';
import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import WebFont from "webfontloader"
import React, { useEffect, useState } from "react"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home'
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import OrderSuccess from './component/Cart/OrderSuccess';



function App() {
  const {isAuthenticated,user} = useSelector(state=>state.user)
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeKey(){
    const {data} = await axios.get("/api/v1/stripeapikey")

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Drold Sans","Chilanka"],
      }
    });
    store.dispatch(loadUser())
    getStripeKey()
  },[])
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}      {/* <UserOptions/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route path='/search' element={<Search/>}/>
        {/* <ProtectedRoute isAuthenticated={isAuthenticated}/> */}
        <Route path='/account' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile/></ProtectedRoute>} />
        <Route path='/me/update' element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile/></ProtectedRoute>} />
        <Route path='/password/update' element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdatePassword/></ProtectedRoute>} />
        <Route path='/password/forgot' element={<ForgotPassword/>} />
        <Route path='/password/reset/:token' element={<ResetPassword/>} />


        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login/shipping' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Shipping/></ProtectedRoute>} />
        <Route path='/order/confirm' element={<ProtectedRoute isAuthenticated={isAuthenticated}><ConfirmOrder/></ProtectedRoute>} />
        {stripeApiKey && (
          <Route path='/process/payment' element={ <Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute isAuthenticated={isAuthenticated}><Payment/></ProtectedRoute></Elements>} />
        )}

        <Route path='/success' element={<ProtectedRoute isAuthenticated={isAuthenticated}><OrderSuccess/></ProtectedRoute>} />


      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
