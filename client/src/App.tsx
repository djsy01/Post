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
          <Route path="/" element={<Post />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/write/:id" element={<Write />} /> {/* 수정 시에도 사용 */}
        </Routes>
      </main>
    </>
  );
}
