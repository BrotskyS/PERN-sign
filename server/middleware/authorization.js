const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) =>{
    try{
    const jwtToken = req.header('token')
        if(!jwtToken){
            res.status(403).json('not auth 1')
        }
       const paylad = jwt.verify(jwtToken, process.env.jwtSecret )
        req.user = paylad.user
        next()
    }catch(err) {
        console.error(err.message)
        return res.status(403).json('Not auth 2 ')
    }
}
