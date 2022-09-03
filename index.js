var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test-yo"
});

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/add', (req, res) => {
    const item = req.body;
    console.log(req.body)
    var sql = "INSERT INTO store (name, quantity, price, category) VALUES ?";  
    con.query(sql, item, function (err, result) {  
    if (err) throw err;  
      console.log("Number of records inserted: " + result.affectedRows);  
    });  

    res.send('Book is added to the database');
});





app.get('/', (req, res) => {
    con.query("SELECT * FROM store", function (err, result, fields) {
      if (err) throw err;
      res.json({ data: result });
      console.log(result);
    });
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));