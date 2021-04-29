const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
app.use(express.json());

const User = require('./src/models/user'); //  DELETE

//public dir for heroku
const publicDirectory = path.join(__dirname, "client/build");
app.use(express.static(publicDirectory));

require('./src/db/mongoose');
app.use(express.static('./src/public'));

if (process.env.NODE_ENV === "production") {  
  app.use(express.static(path.join(__dirname, '../build')));
}
app.get("/",  (req, res) =>{
  res.sendFile(path.join(__dirname, "../build/index.html"));
});


 


// retrive all users MUST BE REMOVED AFTERWARDS
app.get('/bank/allusers', async(req, res)=>{
  try{
   const allUsers = User.find({});
   let usersMap = {};
   (await allUsers).forEach((user)=>{
    usersMap[user._id] = user;
   });
   res.status(200).send(usersMap);
  }catch(err){console.log('err: ', err)} 
 });

const PORT = process.env.PORT || 3014; //this ,ust be the same as in the client package.json =>   "proxy":"http://localhost:3014/",
app.listen(PORT, () => {
  console.log(`Server is up and listening to PORT: ${PORT}`);
});
