const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const conn = require('./mysql/conn'); 
const jwt = require('jsonwebtoken');

app.set('port', process.env.PORT || 5000);
app.set('host', process.env.HOST || 'localhost');  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); 

app.get('/api', (req, res) => {
    res.json({
        login: "Login",
        title: "Register",
        server: "This is the server response"
    })
})

app.get('/home', (req, res) => {
    return res.json({
        message: "Welcome to the home page"
    })
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const SECRET_KEY = process.env.SECRET_KEY || 'StcadsGFdc42A@sdh123GvsBHcEAsdws';
    const loggedInQuery = `SELECT * FROM tbl_accounts WHERE email = ? AND password = ?`;

    if(!email && !password) {
        return res.json({
            error: "All fields are required"
        })
    }

    if(!email){
        return res.json({error: "Email is required!"})
    }

    if(!password){
        return res.json({error: "Password is required!"})
    } else if (password.length < 8){
        return res.json({error: "Password must be at least 8 characters"})
    }

    conn.query(loggedInQuery, [email, password], (err, result) => {

        if(!result.find((user) => user.email === email && user.password === password)) {
            return res.json({error: "Invalid email or password"})
        }

        if(err) {
            return res.json({error: "Failed to login"})
        }

        const token = jwt.sign({email: email, password: password}, SECRET_KEY, {expiresIn: '1h'});
        return res.json({
            message: "Logged in successfully", token: token
        })
    })
})

app.post('/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const insertquery = `INSERT INTO tbl_accounts (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;

    if(!firstName && !lastName && !email && !password) {
        return res.json({message: "All fields are required"})
    }

    if(!firstName) {
        return res.json({message: "First Name is required"})
    }

    if(!lastName) {
        return res.json({message: "Last Name is required"})
    }

    if(!email) {
        return res.json({message: "Email is required"})
    }

    if(!password) {
        return res.json({message: "Password is required"})
    }   

    conn.query(insertquery, [firstName, lastName, email, password], (err, result) => {
        if(err) {
            return res.json({message: "Failed to register user"})
        };

        return res.json({message: "Registered Successfully"})
    })
})

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running on http://${app.get('host')}:${app.get('port')}/api`);
})