import React ,{Fragment, useEffect} from 'react'
import "./ProductList.css"
import {DataGrid} from "@material-ui/data-grid"
import {useSelector , useDispatch} from "react-redux"
import {clearErrors,getAdminProduct,deleteProduct} from "../../actions/productAction"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
import EditIcon from "@material-ui/icons/Edit"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'




const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error , products} = useSelector((state)=>state.products);
  // const {id}= useParams();
  const {error:deleteError , isDeleted} = useSelector((state)=>state.product)
  const navigate = useNavigate()

  const deleteProductHandler = (id) =>{
    dispatch(deleteProduct(id))
  }
  
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success("Product Deleted Sucessfully");
      navigate("/admin/products");
      dispatch({type:DELETE_PRODUCT_RESET})
    }

    dispatch(getAdminProduct())
  }, [error,dispatch,alert,navigate,isDeleted,deleteError])
  

  const columns = [
    {field:"id",headerName:"Product ID",minWidth:200,flex:0.5},
    {
      field:"name",
      headerName:"Name",
      type:"number",
      minWidth:350,
      flex:1,
    },
    {
      field:"stock",
      headerName:"Stock",
      type:"number",
      minWidth:150,
      flex:0.3,
    },
    {
      field:"price",
      headerName:"Price",
      type:"number",
      minWidth:250,
      flex:0.5,
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
            <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
              <EditIcon/>
            </Link>
            <Button onClick={()=> deleteProductHandler(params.getValue(params.id,"id"))}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    }

  ];

  const rows =[

  ];

  products && 
    products.forEach((item) => {
      rows.push({
        id:item._id,
        stock: item.Stock,
        price:item.price,
        name:item.name
      })
    });
  return (
    <Fragment>
      <MetaData title={`All PRODUCTS - ADMIN`}/>
      <div className='dashboard'>
        <Sidebar/>
        <div className='productListContainer'>
          <h1 id='productListHeading'>ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default ProductList