// src/components/Post.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/posts';
import type { Post } from '../api/posts';
import './Post.css';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => {
        console.error(err);
        alert('게시글을 불러오는 데 실패했습니다.');
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  if (loading) return <p className="loading">로딩 중...</p>;

  return (
    <main className="posts-container">
      <ul className="post-list">
        {currentPosts.map(({ b_id, b_title, b_name, b_date }) => (
          <li key={b_id} className="post-item">
            <Link to={`/post/${b_id}`} className="post-link">
              {b_title}
            </Link>
            <div className="post-meta">
              작성자: <span className="post-author">{b_name}</span> | 날짜: {b_date.slice(0, 10)}
            </div>
          </li>
        ))}
      </ul>

      <nav className="pagination" aria-label="페이지네이션">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
            aria-current={currentPage === idx + 1 ? 'page' : undefined}
          >
            {idx + 1}
          </button>
        ))}
      </nav>
    </main>
  );
}