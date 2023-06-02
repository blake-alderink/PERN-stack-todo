const express = require('express');
const cors = require('cors');
const pool = require('./db');
const todos = require('./todos');

const app = express();

app.use('/todos', todos)
app.use(cors());
app.use(express.json());


app.get('/', async(req, res) => {
 
    res.json('is this what you wanted?')
})



app.listen(8000, () => {
    console.log('server listening on port 8000')
})





