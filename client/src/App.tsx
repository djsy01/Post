import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Post from './pages/Post';
import PostDetail from './pages/PostDetail';
import Write from './pages/Write';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Post />} />                 {/* 게시글 목록 */}
          <Route path="/post/:id" element={<PostDetail />} />   {/* 게시글 상세 */}
          <Route path="/write" element={<Write />} />           {/* 게시글 작성 */}
          <Route path="/write/:id" element={<Write />} />       {/* 게시글 수정 */}
        </Routes>
      </main>
    </>
  );
}
