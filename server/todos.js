const express = require('express');
const router = express.Router();
const pool = require('./db');
const cors = require('cors');

router.use((req, res, next) => {
    console.log('this shows that the middleware is working for todos');
    next();
})



router.use(express.json());
router.use(cors());

router.get('/', async (req, res) => {
    try {
        
        const todos = await pool.query('SELECT * FROM todo')
        res.json(todos.rows)

    } catch (error) {
        console.error(error.message)
    }

    

})

router.get('/:id', async (req, res) => {
    try {
        
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows[0])

    } catch (error) {
        console.log(error.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const todoDelete = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
        res.json(`todo with id ${id} was deleted!`)
    } catch (error) {
        console.error(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        console.log("req.body", req.body)
        const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)", [description]);
    res.json(newTodo)
    } catch (err) {
        console.error('error message', err.message)
    }
    
});



module.exports = router;