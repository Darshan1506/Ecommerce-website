import React ,{Fragment, useEffect, useState} from 'react'
import "./ProductReviews.css"
import {DataGrid} from "@material-ui/data-grid"
import {useSelector , useDispatch} from "react-redux"
import {clearErrors, getAllReviews, deleteReviews} from "../../actions/productAction"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import Star from "@material-ui/icons/Star"



const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error:deleteError , isDeleted} = useSelector((state)=>state.review);
  // const {id}= useParams();
  const {error,reviews,loading:updateLoading} = useSelector((state)=>state.productReviews)
  const [productId, setProductId] = useState("")
  const navigate = useNavigate()

  const deleteReviewHandler = (reviewId) =>{
    dispatch(deleteReviews(reviewId,productId))
  }

  const productReviewSubmitHandler = (e)=>{
    e.preventDefault();
    dispatch(getAllReviews(productId))
  }
  
  useEffect(() => {
    if(productId.length === 24){
      dispatch(getAllReviews(productId))

    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success("Review Deleted Sucessfully");
      navigate("/admin/reviews");
      dispatch({type:DELETE_REVIEW_RESET})
    }
  }, [error,dispatch,alert,navigate,isDeleted,deleteError,productId])
  

  const columns = [
    {field:"id",headerName:"Review ID",minWidth:150,
    flex:0.5,},
    
    {
      field:"user",
      headerName:"User",
      minWidth:150,
      flex:0.5,
    },
    {
      field:"comment",
      headerName:"Comment",
      minWidth:300,
      flex:0.5,
    }, 
    {
      field:"rating",
      headerName:"Rating",
      type:"number",
      minWidth:150,
      flex:0.3,
      cellClassName: (params)=>{
        return params.getValue(params.id,"rating") >=3
        ? "greenColor"
        :"redColor"
    }
    },
    {
      field:"actions",
      headerName:"Actions",
      flex:0.3,
      type:"number",
      sortable:false,
      renderCell:(params)=>{
        return (
          <Fragment>
            <Button onClick={()=> deleteReviewHandler(params.getValue(params.id,"id"))}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    }

  ];

  const rows =[

  ];

  reviews && 
    reviews.forEach((item) => {
      rows.push({
        id:item._id,
        rating: item.rating,
        comment:item.comment,
        user:item.name
      })
    });
  return (
    <Fragment>
      <MetaData title={`LL Reviews - ADMIN`}/>
      <div className='dashboard'>
        <Sidebar/>
        <div className='productReviewContainer'>
        <form
                    className='productReviewsForm'
                    onSubmit={productReviewSubmitHandler}
                >

                    <h1 className='productReviewsFormHeading'>All Reviews</h1>
                    <div>
                        <Star/>
                        <input
                            type="text"
                            placeholder='Product id'
                            required
                            value={productId}
                            onChange={(e)=> setProductId(e.target.value)}
                        />
                    </div>
                    
                    <Button
                        id='createProductBtn'
                        type='submit'
                        disabled={updateLoading ? true : false || setProductId===""?true:false}
                    >
                        Search
                    </Button>
                </form>
                {reviews && reviews.length > 0 ? (
                  <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className='productListTable'
                  autoHeight
                />
                ) :(
                  <h1 className='productReviewFormHeading'>
                    No Reviews Found
                  </h1>
                ) }
        </div>
      </div>
    </Fragment>
  )
}

export default ProductReviews