// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./router');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://mabinaya2112:eirMqt43N169P1AM@cluster0.a8vdf5i.mongodb.net/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

app.get('/', (req,res)=>{
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
