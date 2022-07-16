import './App.css';
import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import WebFont from "webfontloader"
import React from "react"
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

function App() {
  const {isAuthenticated,user} = useSelector(state=>state.user)




  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Drold Sans","Chilanka"],
      }
    });
    store.dispatch(loadUser())
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

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
