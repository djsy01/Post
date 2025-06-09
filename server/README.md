# 📦 Backend - 게시판 API 서버

Node.js + Express + MySQL 기반의 게시판 백엔드입니다.

## 🧩 기술 스택
- express@5.1.0
- cors@2.8.5
- nodemon(개발용)@3.1.10
- bcrypt@6.0.0
- dotenv@16.5.0
- mysql2@3.14.2
- multer(파일 업로드)@2.0.1

## ✅ 설치 및 실행

```bash
npm install
npm start
```

## ⚙️ .env
``` env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=mboard
PORT=5000
```

## 🗂️ 디렉토리 구조
backend/
├── db.js                    # MySQL 연결 설정
├── routes/
│   └── Posts.js             # 게시판 라우팅
├── controllers/
│   └── postsController.js   # 게시판 로직 처리
├── middlewares/
│   └── uploads.js           # 업로드된 파일 저장 경로
├── .env
├── app.js                   # 서버 진입점
└── package.json