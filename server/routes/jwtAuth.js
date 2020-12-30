const router = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jstGenerator = require('../utils/jwtGenerator')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')


// /register
router.post('/register',validInfo, async (req, res) => {
    try{
        //destructure req.body
        const {name, email, password} = req.body
        //  check if user exist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if(user.rows.length !== 0) {
            return res.status(401).send('User already exist')
        }
        //Bcrypt password
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)
        console.log(bcryptPassword)
        // insert user into database
        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *;", [name, email, bcryptPassword ])

        // jwt token
        const token = jstGenerator(newUser.rows[0].user_id)

        res.json({token})
    }catch(err) {
        console.error((err.message))
        res.status(500).send('Error server')
    }
})
// /login

router.post('/login', validInfo, async (req, res) => {
    try{
        const {email, password} = req.body

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
        if(user.rows.length === 0){
            return res.status(401).json('Password or Email is incorrect ')
        }
        // check password
        const validPassword = await bcrypt.compare(password, user. rows[0].user_password)

        if(!validPassword){
            return res.status(401).json('Password or Email is incorrect ')
        }
        // jwt token
        const token = jstGenerator(user .rows[0].user_id)

        res.json({token})

    }catch(err) {
        console.error((err.message))
        res.status(500).send('Error server')
    }
})
router.get('/is-verify',authorization, async (req, res) => {
    try{
    res.json(true)
    }catch (err){
        console.error((err.message))
        res.status(500).send('Error server')
    }
})

module.exports = router