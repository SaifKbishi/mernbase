const mongoose = require('mongoose');
const validator = require('validator');

const Todo = mongoose.model('todo',{
 decription:{
  type: String,
  required: [true, "description is required"]
 },
 responsible:{
  type:String,
  required: [true, 'responsible person name is required']
 },
 isCompleted:{
  type: Boolean
 }
});

module.exports = Todo;