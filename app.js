const express = require('express');
const connectDb = require('./config/db.config.js');
const cors = require('cors');
const morgan = require('morgan');
const handleError = require('./error-handling/error.js');
const postTodoRouter = require('./routes/todo.routes');
const getAllTodosRouter = require('./routes/todo.routes');
const updateTodoRouter = require('./routes/todo.routes');
const deleteTodoRouter = require('./routes/todo.routes');
const authSignupRouter = require('./routes/auth.routes');
const authLoginRouter = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware.js');
const userRouter = require('./routes/user.routes');


const app = express();

connectDb();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//test server: is working or no?
// app.get('/', (req, res) => {
//     res.send('Ta funcionando')
// });

//AUTH - rotas publicas
app.use('/', authSignupRouter)    //rota de signup
app.use('/', authLoginRouter)    //rota de login

//MIDDLEWARE
app.use(authMiddleware)

//CRUD
app.use('/', postTodoRouter)   //post
app.use('/', getAllTodosRouter)   //get all
app.use('/' , updateTodoRouter)    //update one todo especifico (id)
app.use('/', deleteTodoRouter)    //delete one todo

//USER
app.use('/', userRouter)  //user router

handleError(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});