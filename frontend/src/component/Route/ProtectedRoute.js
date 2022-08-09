import React from 'react'
import { useSelector } from 'react-redux'
// import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// const ProtectedRoute = ({element : Element, ...rest}) => {
//     const {loading,isAuthenticated,user} = useSelector((state)=>state.user)
//   return (
//     <Fragment>
//         {loading===false && (
//             <Route
//                 {...rest}
//                 render={(props)=>{
//                     if(isAuthenticated){
//                         return <Navigate to='/login' replace/>
//                     }
//                     return <Element {...props}/>
//                 }}
//             />
//         )}
//     </Fragment>
//   )
// }

const ProtectedRoute = ({children , isAuthenticated , isAdmin}) => {
    const {user , loading} = useSelector((state)=>state.user)
    
    if(isAuthenticated === false  ){  //loading === false
        return <Navigate to='/login' replace/>
    }
    if(isAdmin=== true && user.role !=="admin"){
        return <Navigate to='/login' replace/>
    }
    return children;
}




export default ProtectedRoute