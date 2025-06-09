# 💻 Frontend - 게시판 React 웹

Vite + React + TypeScript 기반의 게시판 프론트엔드입니다.

## 🔧 주요 기능
- 게시글 목록 조회
- 게시글 상세 보기
- 게시글 작성 (파일 업로드 포함)
- 게시글 수정 / 삭제 (비밀번호 검증 포함)

## 🧩 기술 스택
- React 19
- TypeScript
- Axios
- React Router DOM
- Vite

## ✅ 설치 및 실행

```bash
npm install
npm run dev
```

## 📁 디렉토리 구조
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.tsx          # Axios API 요청 모듈
│   │   └── posts.ts           # 인스턴스 분리
│   ├── components/
│   │   └── Header.tsx         # 헤더 네비게이션
│   ├── pages/
│   │   ├── Post.tsx           # 게시글 목록
│   │   ├── PostDetail.tsx     # 게시글 상세
│   │   └── WritePost.tsx      # 게시글 작성
│   ├── App.tsx                # components, pages의 tsx파일 연결 라우팅
│   └── main.tsx               # 진입점
├── .env
└── package.json