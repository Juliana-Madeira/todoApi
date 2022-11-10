const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const bearer = req.get(`Authorization`)
    try {
        if(!bearer){
            throw new Error (`Request without token`)
        }
        const token = bearer.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {...decodedToken}
        next();

    } catch (error) {
        error.status = 401
        next(error)
    }
}

module.exports = auth;