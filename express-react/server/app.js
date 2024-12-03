const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const conn = require('./mysql/conn'); 

app.set('port', process.env.PORT || 5000);
app.set('host', process.env.HOST || 'localhost');  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); 

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello from server!'
    })
})

app.post('/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const insertquery = `INSERT INTO tb_register (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;

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
    console.log(`Server is running on http://${app.get('host')}:${app.get('port')}`);
})