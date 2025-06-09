require('dotenv').config();

const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // React 개발 서버 주소
  credentials: true
}));
app.use('/posts', postsRouter);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`✈️ 서버 실행중`);
});
