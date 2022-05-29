const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'cst391',

});

app.post('/create', (req, res) => {
    const name = req.body.name
    const price = req.body.price
    const color = req.body.color
    const size = req.body.size
    const description = req.body.description

    db.query("INSERT INTO item (name, price, color, size, description) VALUES(?,?,?,?,?)", [name, price, color, size, description], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    });
})

app.put('/update', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const color = req.body.color
    const size = req.body.size
    const description = req.body.description
    db.query("update item set name=?,price=?,color=?,size=?,description=? where id=?", [name, price, color, size, description, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})


app.get('/product', (req, res) => {
    db.query("SELECT * FROM item", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("delete from item where id=?", [id], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("The server is running on port 3001")
});

