const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel');

router.get('/todo/',async (req, res)=>{
 try{
  const allTodos = await Todo.find({});
  res.status(200).send(allTodos);
 }catch(error){
  console.log('could not pull all todos');
  res.status(400).send(error);
 }
});

router.get('/todo/:id', (req, res)=>{
 Todo.findById(req.params.id, (error, todo)=>{
  if(!todo){
   res.status(404).send('not todo found');
  }else{
   res.status(200).send(todo);
  }
 });
});

router.post('/todo/', async (req, res)=>{  
 const newTodo = new Todo(req.body);
 try{
  
  await newTodo.save();
  res.status(201).send(newTodo);
 }catch(error){
  console.log('could not create new todo');
  res.status(400).send({error});
 }
});

router.patch('/todo/:id', async (req, res)=>{ 
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

router.delete('/todo/:id', async (req, res)=>{
 try{
  const todoToDelete = await Todo.findByIdAndDelete(req.params.id);
  if(!todoToDelete){   
   return res.status(404).send();
  }
  res.send(todoToDelete);
 }catch(error){
  console.log('failed to delete the todo', error);
 }
});

module.exports = router;