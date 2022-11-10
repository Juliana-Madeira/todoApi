const { Router } = require("express");
const Todo = require('../models/Todo.model.js');
const User = require('../models/User.model.js');  //iteração 4 da parte II

const router = Router();

//criar um todo - post a new todo
router.post('/todos', async (req, res) => {
    const { title, completed } = req.body;
    try {
        const userId = req.user.id   //iteraçao 4 parte II
        const newTodo = await Todo.create({...req.body, user: userId})    //user colocar na iteraçao 4 parte II, parte I só req body
        await User.findByIdAndUpdate(userId, {$push: { todos: newTodo._id}})   //essa parte só na iteração 4 parte II
        res.status(201).json({newTodo, msg: 'Todo created'})
    } catch (error) {
        res.status(400).json({msg: `Could not post a new todo`, error})
    }
})

//get all todos
router.get('/todos', async (req, res) => {
    try {
        const userId = req.user.id    //iteração 4 parte II
        const allTodos = await Todo.find({user: userId})     //user dentro do find só na iteração 4 parte II, na parte I fica vazio ainda
        res.status(200).json(allTodos)
    } catch (error) {
        res.status(500).json({msg: `Could not get all todos`, error})
    }
});


//update todo especifico (id)
router.put('/todos/:todoId', async (req, res) => {
    const { title, completed } = req.body;
    const { todoId } = req.params;
    const userId = req.user.id     //user na iteração 4 da parte II
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: todoId, user: userId },      //user só na iteraçao 4 parte II
            {...req.body},
            {new: true}
        )
        res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(500).json({msg: `Could not update this todo`, error})
    }
});


//delete todo (one todo)
router.delete('/todos/:todoId', async (req, res) => {
    const { todoId } = req.params;
    const userId = req.user.id     //na iteração 4 parte II incluir o userId
    try {
        //await Todo.findByIdAndDelete(todoId)        //assim se for deletar todos que com login nao vai rolar mais antes da iteração 4 parte II era assim
        const myTodo = await Todo.findById(todoId)
        if(myTodo.user.toString() !== userId){
            throw new Error (`Cannot delete another use´s Todo`)
        }
        myTodo.delete();
        res.status(200).json({msg: 'Todo deleted!'})
    } catch (error) {
        res.status(500).json({msg: `Could not delete this todo`, error})
    }
})

module.exports = router;