const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
app.use(express.json());
const todoRoute = require('./src/routes/todo');
app.use('/api', todoRoute);

//public dir for heroku
const publicDirectory = path.join(__dirname, "createmerntest/build");
app.use(express.static(publicDirectory));

require('./src/db/mongoose');
app.use(express.static('./src/public'));

if (process.env.NODE_ENV === "production") {  
  app.use(express.static(path.join(__dirname, './build'))); //set
}
app.get("/",  (req, res) =>{
  res.sendFile(path.join(__dirname, "./build/index.html"));
});



app.get("/",  (req, res) =>{ res.send('hello from the server')});


const PORT = process.env.PORT || 3001; //this must be the same as in the client package.json =>   "proxy":"http://localhost:3014/",
app.listen(PORT, () => {
  console.log(`Server is up and listening to PORT: ${PORT}`);
});
