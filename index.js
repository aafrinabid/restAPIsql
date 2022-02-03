const { urlencoded } = require('express');
const express=require('express');
const app=express()
const pool=require('./db');

app.use(express.json())
app.use(express.urlencoded({extended:true}))



//select a specific todo
app.get('/todos/:id',async(req,res)=>{
    const {id}=req.params;
    try{
      
         const todo=await pool.query("select * from todo WHERE todo_id = $1", [id]);
         res.json(todo.rows[0]);
    }
    catch(err){
 console.error(err.message)
    }
 });
//creaate a todo

app.post('/todos',async(req,res)=>{
   try{
        const {description}=req.body
        const newTodo=await pool.query("INSERT INTO todo(description) VALUES ($1) RETURNING *",
        [description]);
        res.json(newTodo);
   }
   catch(err){
console.error(err.message)
   }
});



//select a todo

app.get('/todos',async(req,res)=>{
    try{
         const todos=await pool.query("select * from todo ")
         res.json(todos.rows);
    }
    catch(err){
 console.error(err.message)
    }
 });
//creaate a todo

app.post('/todos',async(req,res)=>{
   try{
        const {description}=req.body
        const newTodo=await pool.query("INSERT INTO todo(description) VALUES ($1) RETURNING *",
        [description]);
        res.json(newTodo);
   }
   catch(err){
console.error(err.message)
   }
});

//updater a todo

app.put('/todos/:id',async(req,res)=>{
    const {id}=req.params;
    const {description}=req.body
    try{
      
         const uTodo=await pool.query("update todo SET  description = $1 WHERE todo_id = $2", [description,id]);

         res.json("todo was updated");
    }
    catch(err){
 console.error(err.message)
    }
 });
 //delete
 app.delete('/todos/:id',async(req,res)=>{
    const {id}=req.params;
    try{
      
         const dTodo=await pool.query("delete from todo  WHERE todo_id = $1", [id]);

         res.json("todo was deleted");
    }
    catch(err){
 console.error(err.message)
    }
 });














app.listen(3000,()=>{
    console.log('listening at 3000')
})
