import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, deletePost } from '../api/posts';
import type {Post} from '../api/posts'
import './PostDetail.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetchPostById(Number(id))
      .then(setPost)
      .catch(err => {
        console.error(err);
        alert('게시글 조회 실패');
        navigate('/');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = () => {
    const pwd = prompt('비밀번호를 입력하세요');
    if (!pwd) return alert('비밀번호가 필요합니다');
    if (!id) return;

    deletePost(Number(id), pwd)
      .then(() => {
        alert('게시글이 삭제되었습니다.');
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert('삭제 실패 또는 비밀번호 불일치');
      });
  };

  const isImageFile = (filename: string) =>
    /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filename);

  if (loading) return <p>로딩 중...</p>;
  if (!post) return <p>게시글이 없습니다.</p>;

  return (
    <div className="post-detail-container">
      <h2>{post.b_title}</h2>
      <p className="post-meta">
        작성자: {post.b_name} ({post.b_mail || '이메일 없음'}) |{' '}
        {post.b_date.slice(0, 10)}
      </p>
      <div className="post-content">{post.b_content}</div>

      {post.b_filename && (
        <div className="post-attachment">
          <p>첨부파일:</p>
          {isImageFile(post.b_filename) ? (
            <img
              src={`${API_BASE_URL}/uploads/${post.b_filename}`}
              alt={post.b_filename}
              className="attachment-image"
            />
          ) : (
            <a
              href={`${API_BASE_URL}/uploads/${post.b_filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="attachment-link"
            >
              {post.b_filename} ({post.b_filesize} bytes)
            </a>
          )}
        </div>
      )}

      <div className="post-actions">
        <button
          onClick={() => navigate(`/write/${post.b_id}`)}
          className="btn edit-btn"
        >
          수정
        </button>
        <button onClick={handleDelete} className="btn delete-btn">
          삭제
        </button>
        <button onClick={() => navigate('/')} className="btn back-btn">
          목록
        </button>
      </div>
    </div>
  );
}
