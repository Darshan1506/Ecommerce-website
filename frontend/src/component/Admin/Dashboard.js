import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Dashboard.css"
import Sidebar from "./Sidebar"
import {Doughnut , Line} from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProduct } from '../../actions/productAction'

const Dashboard = () => {
    const { products} = useSelector((state)=>state.products);
    const dispatch = useDispatch();
    let outOfStock = 0;

    products && 
        products.forEach((item)=>{
            if(item.Stock === 0){
                outOfStock += 1;
            }
        })

        useEffect(() => {
            dispatch(getAdminProduct())
          }, [dispatch])

    const lineState = {
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[0,4000]
            }
        ]
    }

    const doughnutState = {
        labels:["Out of Stock","In Stock"],
        datasets:[
            {
                backgroundColor:["#00A6B4","#6800B4"],
                hoverBackgroundColor:["#4B5000","#35014F"],
                data:[outOfStock,products.length - outOfStock]
            }
        ]
    }
  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className='dashboardContainer'>
            <Typography component="h1">Dashboard</Typography>
            <div className='dashboardSummary'>
                <div>
                    <p>
                    Total Amount <br/> ₹2000
                    </p>
                </div>
                <div className='dashboardSummaryBox2'>
                    <Link to="/admin/products">
                        <p>Product</p>
                        <p>{products && products.length}</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>4</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>2</p>
                    </Link>

                </div>

            </div>
            <div className='linechart'>
                <Line
                    data={lineState}
                />
            </div>
            <div className='doughnutchart'>
                <Doughnut
                    data={doughnutState}
                />

            </div>

        </div>
    </div>
  )
}

export default Dashboard