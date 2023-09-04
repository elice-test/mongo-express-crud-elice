const express = require('express');
const connectDb = require('./config/db');
const dotenv = require('dotenv').config();
const postRouter = require('./routes/postRouter');

connectDb();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/posts',postRouter);

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
})