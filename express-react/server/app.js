const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const conn = require('./mysql/conn'); 
const jwt = require('jsonwebtoken');
const path = require('path');
const session = require('express-session');

app.set('port', process.env.PORT || 5000);
app.set('host', process.env.HOST || 'localhost');  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

function generateId(length){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.use(session({
    secret: process.env.SESSION_KEY || generateId(70),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}))

app.get('/api', (req, res) => {
    res.status(200).json({
        login: "Login Account",
        title: "Register Account",
    })
})

app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "Welcome to the Home Page",
        session: req.session.user
    })
})

app.get('/data', (req, res) => {
    const data = `SELECT * FROM tbl_accounts`;

    conn.query(data, (err, result) => {
        if(err){
            return res.json({message: `Cannot retrieve data:  ${err}`})
        } else {
            return res.json({message: result})
        }
    })
})

app.post('/login', (req, res) => {
    function generateId(length){
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const {email, password} = req.body;
    const SECRET_KEY = process.env.SECRET_KEY || generateId(70);

    if(!SECRET_KEY){
        return res.json({
            error: "Failed to generate token"
        })
    } else {
        console.log(`Token: ${SECRET_KEY}`);
    }

    const loggedInQuery = `SELECT * FROM tbl_accounts WHERE email = ? AND password = ?`;
    
    if(!email && !password) {
        return res.status(200).json({
            error: "Fill up all required fields"
        })
    }

    if(!email){
        return res.status(200).json({error: "Email is required!"})
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    if(!emailRegex.test(email)){
        return res.status(200).json({error: "Invalid email adddress"})
    }

    if(!password){
        return res.json({error: "Password is required!"})
    } 
    
    if (password.length <= 8){
        return res.status(200).json({error: "Password must be at least 8 characters"})
    }

    conn.query(loggedInQuery, [email, password], (err, result) => {
        if(err) {
            return res.status(200).json({error: "Failed to login"})
        } else {
            if(!result.find((user) => user.email === email && user.password === password)) {
                return res.status(200).json({error: "Invalid email and password"})
            }

            const user = result[0];
            const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '1h'});
            const session = req.session.user = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            }
            
            return res.status(200).json({
                message: "Logged in successfully", 
                token: token, 
                session: session
            })
        }
    })
})

app.post('/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    function generateId(length){
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const generateToken = process.env.SECRET_KEY || generateId(70);

    if(!generateToken){
        return res.json({error: "Failed to generate token"})
    } else {
        console.log(`Registration Token: ${generateToken}`);
    }
    
    const insertquery = `INSERT INTO tbl_accounts (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;

    if(!firstName && !lastName && !email && !password) {
        return res.status(200).json({message: "All fields are required"})
    }

    if(!firstName) {
        return res.status(200).json({message: "First Name is required"})
    }

    if(!lastName) {
        return res.status(200).json({message: "Last Name is required"})
    }

    if(!email) {
        return res.status(200).json({message: "Email is required"})
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    if(!emailRegex.test(email)) {
        return res.status(200).json({message: "Invalid email address"})
    }
    
    if(!password) {
        return res.status(200).json({message: "Password is required"})
    }   

    if(password.length <= 4){
        return res.status(200).json({message: "Your password is weak"})
    }

    if(password.length <= 8){
        return res.status(200).json({message: "Your password is moderate"})
    }

    if(password.length <= 12 && password.length >= 8){
        return res.status(200).json({message: "Your password is strong"})
    }   

    conn.query(insertquery, [firstName, lastName, email, password], (err, result) => {
        if(err) {
            return res.status(200).json({message: "Failed to register user"})
        };

        const token = jwt.sign({id: result.insertId}, generateToken, {expiresIn: '1h'});2
        const session = req.session.user = {
            id: result.insertId,
        }
        return res.status(200).json({message: "Registered Successfully", token: token, session: session})
    })
})

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running on http://${app.get('host')}:${app.get('port')}/api`);
})