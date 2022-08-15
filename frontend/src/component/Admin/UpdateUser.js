import { Button } from '@material-ui/core'
import React, { Fragment , useEffect , useState} from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import "./NewProduct.css"
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PersonIcon from '@material-ui/icons/Person'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { UPDATE_USERS_RESET } from '../../constants/userConstants'
import { getUserDetails, updateUser ,clearErrors} from '../../actions/userAction'
import Loader from '../layout/Loader/Loader'


const UpdateUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert();
    const {id} = useParams()
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
    } = useSelector((state) => state.profile);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

      useEffect(()=>{
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
          } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
          }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("User Updated Successfully")
            navigate("/admin/users")
            dispatch({type:UPDATE_USERS_RESET});
        }
      },[dispatch,alert,error,navigate,isUpdated,updateError,id,user])

      const updateUserSubmitHandler = (e) =>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email)
        myForm.set("role",role)

        dispatch(updateUser(id,myForm))

      }

     



  return (
    <Fragment>
        <MetaData title="Update Product"/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='newProductContainer'>
                {loading ? <Loader/> :(
                    <form
                    className='createProductForm'
                    onSubmit={updateUserSubmitHandler}
                >

                    <h1>Update Product</h1>
                    <div>
                        <PersonIcon/>
                        <input
                            type="text"
                            placeholder='Name'
                            required
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <MailOutlineIcon/>
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <VerifiedUserIcon/>
                        <select value={role} onChange={(e)=> setRole(e.target.value)}>
                            <option value="">Choose Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>

                            
                        </select>
                    </div>
                  

                    
                    
                    <Button
                        id='createProductBtn'
                        type='submit'
                        disabled={updateLoading ? true : false || role===""?true:false}
                    >
                        Update
                    </Button>
                </form>
                )}
            </div>

        </div>

    </Fragment>
    )
}

export default UpdateUser