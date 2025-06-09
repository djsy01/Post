require('dotenv').config();

const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const pool = require('./db');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://(당신의_배포_프론트_도메인)'],  // React 개발 서버 주소 (배포시 변경 필요)
  credentials: true
}));
app.use('/posts', postsRouter);
app.use('/uploads', express.static('uploads'));

// DB 연결 테스트 함수
async function testDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ DB 연결 성공');
    connection.release();
  } catch (err) {
    console.error('❌ DB 연결 실패:', err.message);
  }
}

app.listen(PORT, async () => {
  console.log(`✈️ 서버 실행중 (포트: ${PORT})`);
  await testDBConnection();
});
