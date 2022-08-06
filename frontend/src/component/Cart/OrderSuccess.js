import React from 'react'
import "./OrderSuccess.css"
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className='orderSuccess'>
        <CheckCircleIcon/>

        <Typography>Your Order has been Places Successfully</Typography>
        <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess