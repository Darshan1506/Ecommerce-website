const app = require("./app")

const dotenv = require("dotenv")
const connectDatabase = require("./config/database")
//handling Uncaught Exception ed cnsole.log(youtube)
process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down this server due to Uncaught Exception`)
    process.exit(1)
})


//config
dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase()


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on https://localhost:${process.env.PORT}`)
})


//unhandled promise Rejection eg.wrong mongo
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down this server due to unhandled Promise Rejection`)
    server.close(()=>{
        process.exit(1)
    })
})