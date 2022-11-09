const express = require('express');
const connectDb = require('./config/db.config.js');
const cors = require('cors');

const postTodoRouter = require('./routes/todo.routes');
const getAllTodosRouter = require('./routes/todo.routes');
const updateTodoRouter = require('./routes/todo.routes');
const deleteTodoRouter = require('./routes/todo.routes');

connectDb();

const app = express();
app.use(express.json());
app.use(cors());


//test server: is working or no?
app.get('/', (req, res) => {
    res.send('Ta funcionando')
});


//CRUD
app.use('/', postTodoRouter)   //post
app.use('/', getAllTodosRouter)   //get all
app.use('/' , updateTodoRouter)    //update one todo especifico (id)
app.use('/', deleteTodoRouter)    //delete one todo


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});