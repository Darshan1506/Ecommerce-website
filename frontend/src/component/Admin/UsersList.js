import React ,{Fragment, useEffect} from 'react'
import "./ProductList.css"
import {DataGrid} from "@material-ui/data-grid"
import {useSelector , useDispatch} from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
import EditIcon from "@material-ui/icons/Edit"
import { getAllUsers ,clearErrors, deleteUser } from '../../actions/userAction'
import { DELETE_USERS_RESET } from '../../constants/userConstants'




const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error , users} = useSelector((state)=>state.allUsers);
  const {error:deleteError , isDeleted, message} = useSelector((state)=>state.profile)
  const navigate = useNavigate()

  const deleteUserHandler = (id) =>{
    dispatch(deleteUser(id))
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
      alert.success(message);
      navigate("/admin/users");
      dispatch({type:DELETE_USERS_RESET})
    }

    dispatch(getAllUsers())
  }, [error,dispatch,alert,navigate,isDeleted,deleteError,message])
  

  const columns = [
    {field:"id",headerName:"User ID",minWidth:300,flex:0.3},
    {
      field:"email",
      headerName:"Email",
      minWidth:150,
      flex:0.5,
    },
    {
      field:"name",
      headerName:"Name",
      minWidth:150,
      flex:0.5,
    },
    {
      field:"role",
      headerName:"Role",
      minWidth:150,
      flex:0.3,
      cellClassName: (params)=>{
        return params.getValue(params.id,"role") ==="admin"
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
            <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
              <EditIcon/>
            </Link>
            <Button onClick={()=> deleteUserHandler(params.getValue(params.id,"id"))}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    }

  ];

  const rows =[

  ];

  users && 
    users.forEach((item) => {
      rows.push({
        id:item._id,
        role: item.role,
        email:item.email,
        name:item.name
      })
    });
  return (
    <Fragment>
      <MetaData title={`All Users - ADMIN`}/>
      <div className='dashboard'>
        <Sidebar/>
        <div className='productListContainer'>
          <h1 id='productListHeading'>ALL USERS</h1>
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

export default UsersList