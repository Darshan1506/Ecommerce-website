const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.messsage = err.messsage || "Internal Server Error";
    // wrong mongodb id cast error
    if(err.name ==="CastError"){
        const message =`Resouce not found , Invalid:${err.path}`
        err= new ErrorHandler(message,400);
    }

    //mongoose error
    if(err.code === 11000){
        const message = `duplicate ${Object.keys(err.keyValue)} Entered`
        err= new ErrorHandler(message,400);
    }

    //WRONG JWT ERROR
    if(err.name === "jsonwebTokenError"){
        const message = `jwt is invalid try again`
        err= new ErrorHandler(message,400);
    }

    //jwt expire error
    if(err.name === "TokenExpireError"){
        const message = `jwt is expired try again`
        err= new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        message : err.message,
    })
}
