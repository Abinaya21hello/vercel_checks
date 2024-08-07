// backend/routes/todoRoutes.js
const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('./controller');

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
