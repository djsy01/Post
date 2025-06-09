import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById, createPost, updatePost } from '../api/posts';
import './Write.css';

interface PostForm {
  b_name: string;
  b_title: string;
  b_mail: string;
  b_content: string;
  b_pwd: string;
  file?: File;
}

export default function Write() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<PostForm>({
    b_name: '',
    b_title: '',
    b_mail: '',
    b_content: '',
    b_pwd: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchPostById(Number(id))
        .then(post => {
          const { b_name, b_title, b_mail = '', b_content } = post;
          setForm(prev => ({ ...prev, b_name, b_title, b_mail, b_content }));
        })
        .catch(err => {
          console.error(err);
          alert('게시글 불러오기 실패');
          navigate('/');
        });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm(prev => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.b_name || !form.b_title || !form.b_content || !form.b_pwd) {
      return alert('필수 입력 사항을 모두 채워주세요');
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('b_name', form.b_name);
      formData.append('b_title', form.b_title);
      formData.append('b_mail', form.b_mail);
      formData.append('b_content', form.b_content);
      formData.append('b_pwd', form.b_pwd);

      if (form.file) {
        formData.append('file', form.file);
      }

      if (isEdit && id) {
        await updatePost(Number(id), formData);
        alert('게시글 수정 완료');
      } else {
        await createPost(formData);
        alert('게시글 작성 완료');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('게시글 저장 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="write" onSubmit={handleSubmit}>
      <h2>{isEdit ? '게시글 수정' : '게시글 작성'}</h2>

      <div className="row">
        <label htmlFor="b_name">닉네임</label>
        <input
          id="b_name"
          name="b_name"
          value={form.b_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <label htmlFor="b_title">제목</label>
        <input
          id="b_title"
          name="b_title"
          value={form.b_title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <label htmlFor="b_mail">이메일</label>
        <input
          id="b_mail"
          name="b_mail"
          value={form.b_mail}
          onChange={handleChange}
          type="email"
        />
      </div>

      <div className="row">
        <div className="label-group">
          <label htmlFor="b_pwd">비밀번호</label>
          <div className="note">(삭제 및 수정에 필요)</div>
        </div>
        <input
          id="b_pwd"
          name="b_pwd"
          value={form.b_pwd}
          onChange={handleChange}
          type="password"
          required
        />
      </div>

      <label>
        내용
        <textarea
          name="b_content"
          value={form.b_content}
          onChange={handleChange}
          required
        />
      </label>

      <label className="file-label">
        첨부파일
        <input type="file" onChange={handleFileChange} />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? '저장중...' : '저장'}
      </button>
    </form>
  );
}