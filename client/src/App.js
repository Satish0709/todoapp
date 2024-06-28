import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios.get('http://localhost:5000/api/todos');
      setTodos(result.data);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const result = await axios.post('http://localhost:5000/api/todos', newTodo);
    setTodos([...todos, result.data]);
    setNewTodo({ title: '', description: '' });
  };

  const handleUpdate = async (id, updatedTodo) => {
    const result = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo);
    setTodos(todos.map(todo => (todo._id === id ? result.data : todo)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newTodo.description}
        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
      ></textarea>
      <button onClick={handleAddTodo}>Add Todo</button>
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default App;
