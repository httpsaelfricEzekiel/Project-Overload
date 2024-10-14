const app = require('./express/express');
const conn = require('./mysql/conn');

app.get('/', (req, res) => {
    res.json({ message: "hello backend from nodejs" })
})

app.post('/insert', (req, res) => {
    const id = 0;
    const email = req.body.email;
    const password = req.body.password;

    const insertQuery = `INSERT INTO students VALUES ("${id}", "${email}", "${password}")`;

    conn.query(insertQuery, (err, result) => {
        if (err) throw err;

        res.sendStatus(200).send(`
            <script>
                alert("1 student inserted");
                window.location.href="/";
            </script>    
        `)
    })

})
app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running at http://${app.get('host')}:${app.get('port')}`);
})