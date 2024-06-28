const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  await todo.save();
  res.json(todo);
});

app.put('/api/todos/:id', async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
  res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
