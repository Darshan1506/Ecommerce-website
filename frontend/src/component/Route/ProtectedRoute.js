import React, {  Fragment } from 'react'
// import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

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

const ProtectedRoute = ({children , isAuthenticated}) => {
    // const {loading} = useSelector((state)=>state.user)
    if(!isAuthenticated){
        return <Navigate to='/login' replace/>
    }
    return children;
}




export default ProtectedRoute