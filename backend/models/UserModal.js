const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter your ppassword"],
        minLength:[8,"Paaword should be greater than 8 characters"],
        select:false //while searchimg in mongo it wont show
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});


userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password,10);
})

//JWT TOKEN
userSchema.methods.getJWTTOKEN = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE, 
  })
}

//compare password
userSchema.methods.comparePassword = async function(enteredPasssword){
  return await bcrypt.compare(enteredPasssword,this.password)
}


// Generating reser password reset token
userSchema.methods.getResetPasswordToken = function(){

  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex")

  //hashing and adding reset passwordtoken to user 
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 15*60*1000;

  return resetToken;
}


module.exports = mongoose.model("User",userSchema);
