const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel');

//retrive all items
router.get('/todos/',async (req, res)=>{
 try{
  const allTodos = await Todo.find({});
  res.status(200).send(allTodos);
 }catch(error){
  console.log('could not pull all todos');
  res.status(400).send(error);
 }
});

//retrive item by ID
router.get('/todos/:id', (req, res)=>{
 Todo.findById(req.params.id, (error, todo)=>{
  if(!todo){
   res.status(404).send('not todo found');
  }else{
   res.status(200).send(todo);
  }
 });
});

//create item
router.post('/todos/new', async (req, res)=>{  
 console.log('going to create new item');
 const newTodo = new Todo(req.body);
 try{
  
  await newTodo.save();
  res.status(201).send(newTodo);
 }catch(error){
  console.log('could not create new todo');
  res.status(400).send({error});
 }
});

//update item by ID
router.patch('/todos/:id', async (req, res)=>{ 
 try{
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  console.log('id:',req.params.id, 'body:',req.body)
  if(!todo){
   return res.status(404).send();
  }
  res.send(todo);
 }catch(error){
  console.log('error updating the todo', error);
 } 
});

//delete item by ID
router.delete('/todos/:id', async (req, res)=>{
 console.log('req.params.id:',req.params.id)
 try{
  const todoToDelete = await Todo.findByIdAndDelete(req.params.id);
  console.log('todo.js 59:', todoToDelete)
  if(!todoToDelete){   
   return res.status(404).send();
  }
  res.send(todoToDelete);
 }catch(error){
  console.log('failed to delete the todo', error);
 }
});

module.exports = router;