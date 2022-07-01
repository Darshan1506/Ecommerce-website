const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../models/UserModal");

module.exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id)
    next()
})

module.exports.authorizedRoles= (...roles) =>{
    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role:${req.user.role} is not allowed this resource`,403)
        )}
        next();
    }
}