const express = require('express');
const connectDb = require('./config/db');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors');
const session = require('express-session');

connectDb();
const app = express();

/*-----세션 ----*/
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

/*--------------*/

/** cors관련 */
// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));

/*--------------*/

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/posts',postRouter);
app.use('/api/users',userRouter);
app.get('/check-login', (req, res) => {
  console.log('check-login',req.session)
  if (req.session.isLoggedIn) {
    res.status(200).send('로그인 상태입니다.');
  } else {
    res.status(401).send('로그인되지 않았습니다.');
  }
});

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
})