require("dotenv").config();
const mongoose = require('mongoose');
// const app = require("./app");
const express= require("express")
const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the task-manager database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost`);
});




// app.listen(process.env.PORT,
//   {
//     useNewUrlParser:true,
//     useUnifiedTopology: true,
//   },
//   ()=>{
//   console.log(`Listening to ${process.env.PORT}`);
// })

// mongoose.connect(process.env.MONGODB_URI).then(()=>{
//   console.log("Connected To MongoDB");
// }).catch((error)=> console.log("Not Connected To DB--", error))