const express = require('express');
const connectDb = require('./config/db');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors');

connectDb();
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/posts',postRouter);
app.use('/api/users',userRouter);

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
})