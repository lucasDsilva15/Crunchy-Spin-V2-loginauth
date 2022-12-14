const jwt = require('jsonwebtoken')

function authorizedev (req, res, next){
    try {
        let token = req.header('Authorization')
        if (!token){
            throw new Error('no token provided')
        }

        token = token.replace ("Bearer ", '')

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (payload.error) {
            throw new Error(payload.error.message)
        }

        req.userId = payload
        req.user= payload.user
        req.developer = payload.developer

        if (!req.developer){
            throw new Error("You shouldn't be here")
        }

        next()
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

module.exports = {
    authorizedev
}