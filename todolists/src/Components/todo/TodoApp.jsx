// frontend/src/components/TodoApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Checkbox, 
  Typography 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../api/Axiosinstance';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('api/todos');
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axiosInstance.post('api/todos', { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(todo => todo._id === id);
    try {
      const response = await axiosInstance.put(`api/todos/${id}`, {
        title: todo.title,
        completed: !todo.completed,
      });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Todo List
      </Typography>
      <TextField
        variant="outlined"
        label="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addTodo} fullWidth>
        Add Todo
      </Button>
      <List>
        {todos.map(todo => (
          <ListItem key={todo._id} dense button>
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              onClick={() => toggleTodo(todo._id)}
            />
            <ListItemText 
              primary={todo.title} 
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            />
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoApp;
