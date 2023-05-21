const express=require("express");
const mongoose=require('mongoose');
const router = require("./routes/userRoutes");
const app=express();
const port=5000;
app.use(express.json())
app.use('/users',router)

mongoose
.connect('mongodb+srv://admin:9Vv2hU1xrpnsKVHc@cluster0.ui8kl56.mongodb.net/?retryWrites=true&w=majority')
.then(()=>app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
}))
.catch((err)=>console.log(err));