const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practice'
})

conn.connect((err) => {
    if (err) throw err;

    console.log("Server connected");
})

module.exports = conn;