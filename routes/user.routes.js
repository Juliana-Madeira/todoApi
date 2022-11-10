const { Router } = require('express')
const User = require('../models/User.model.js')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('todos')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router