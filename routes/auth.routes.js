const { Router } = require('express');
const User = require('../models/User.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

//rota para signup
router.post('/auth/signup', async (req, res, next) => {
    const { username, email, password } = req.body;   //é o nosso payload
    try {
        if(!username || !password || !email){
            const error = new Error(`All fields are required!`)
            error.status = 400
            throw error
        }
        
        const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
        if(!regexPassword.test(password)){
            const error = new Error(`Password must have at least 1 uppercase letter, 1 lowercase letter, 
            1 special character and 6 characters in total`)
            error.status = 400
            throw error
        }

        const userExists = await User.findOne({email});
        if(userFromDb){
            throw new Error(`User already exists!`)
        }

        const salt = bcrypt.genSaltSync(12);
        const passwordHash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            username,
            email,
            passwordHash
        })

        res.status(201).json({username, email, id: newUser._id})

    } catch (error) {
        console.log(error)
        next(error)
    }
})


//rota de login
router.post('/auth/login', async (req, res, next) => {
    const { email, password } = req.body;       //payload do login
    try {
        if(!email || !password){
            const error = new Error(`All fields are required`)
            error.status = 400
            throw error
        }

        const userFromDb = await User.findOne({ email })
        if(!userFromDb){
            const error = new Error(`User not found`)
            error.status = 401
            throw error
        }

        const verifyHash = bcrypt.compareSync(password, userFromDb.passwordHash)
        if(!verifyHash){
            const error = new Error(`Invalid password`)
            error.status = 401
            throw error     //evita descobrir senha se avisa que o email está certo
            
        }

        const payload = {                                    
            id: userFromDb.id,
            email: userFromDb.email,
            username: userFromDb.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.status(200).json({username: userFromDb.username, token})

    } catch (error) {
        next(error)
    }
})


module.exports = router;