const { Router } = require("express");
const Todo = require('../models/Todo.model.js')
const router = Router()

//criar um todo - post a new todo
router.post('/new-todo', async (req, res) => {
    const { title, completed } = req.body;
    try {
        const newTodo = await Todo.create({...req.body}) 
        res.status(201).json({newTodo, msg: 'Todo created'})
    } catch (error) {
        res.status(400).json({msg: `Could not post a new todo`, error})
    }
})

//get all todos
router.get('/todos', async (req, res) => {
    try {
        const allTodos = await Todo.find()
        res.status(200).json(allTodos)
    } catch (error) {
        res.status(500).json({msg: `Could not get all todos`, error})
    }
});


//update todo especifico (id)
router.put('/todos/:todoId', async (req, res) => {
    const { title, completed } = req.body;
    const { todoId } = req.params;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: todoId },
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
    try {
        await Todo.findByIdAndDelete(todoId)
        res.status(200).json({msg: 'Todo deleted!'})
    } catch (error) {
        res.status(500).json({msg: `Could not delete this todo`, error})
    }
})

module.exports = router;