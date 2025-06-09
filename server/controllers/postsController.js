const pool = require('../db');

// 게시글 전체 조회
exports.getAllPosts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mdb ORDER BY b_date DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB 조회 오류' });
  }
};

// 게시글 단건 조회 (b_id 기준)
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM mdb WHERE b_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: '게시글 없음' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB 조회 오류' });
  }
};

// 게시글 작성
exports.createPost = async (req, res) => {
  const { b_name, b_title, b_mail, b_content, b_pwd } = req.body;
  // 업로드된 파일 정보
  const b_filename = req.file ? req.file.filename : null; // 서버 저장 파일명
  const b_filesize = req.file ? req.file.size.toString() : null;

  try {
    const [result] = await pool.query(
      `INSERT INTO mdb (b_name, b_title, b_mail, b_content, b_pwd, b_filename, b_filesize, b_date, b_view)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 0)`,
      [b_name, b_title, b_mail, b_content, b_pwd, b_filename, b_filesize]
    );
    res.status(201).json({ message: '게시글 작성 완료', b_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글 작성 실패' });
  }
};


exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { b_name, b_title, b_mail, b_content, b_pwd } = req.body;

  // 업로드된 파일이 있으면 새로 설정, 없으면 기존 파일 유지
  const b_filename = req.file ? req.file.filename : null;
  const b_filesize = req.file ? req.file.size.toString() : null;

  try {
    // 비밀번호 확인
    const [rows] = await pool.query('SELECT b_pwd FROM mdb WHERE b_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: '게시글 없음' });
    if (rows[0].b_pwd !== b_pwd) return res.status(403).json({ message: '비밀번호 불일치' });

    // 기존 파일 유지할지 여부 결정 (파일 없으면 기존 파일명 유지)
    if (b_filename === null) {
      // 기존 파일명과 파일 크기 조회
      const [fileRows] = await pool.query('SELECT b_filename, b_filesize FROM mdb WHERE b_id = ?', [id]);
      const oldFilename = fileRows[0].b_filename;
      const oldFilesize = fileRows[0].b_filesize;

      await pool.query(
        `UPDATE mdb SET b_name = ?, b_title = ?, b_mail = ?, b_content = ?, b_filename = ?, b_filesize = ? WHERE b_id = ?`,
        [b_name, b_title, b_mail, b_content, oldFilename, oldFilesize, id]
      );
    } else {
      // 새 파일로 업데이트
      await pool.query(
        `UPDATE mdb SET b_name = ?, b_title = ?, b_mail = ?, b_content = ?, b_filename = ?, b_filesize = ? WHERE b_id = ?`,
        [b_name, b_title, b_mail, b_content, b_filename, b_filesize, id]
      );
    }

    res.json({ message: '게시글 수정 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글 수정 실패' });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  console.log('Delete Post req.query:', req.query);
  const b_pwd = req.query.pwd;

  try {
    // 비밀번호 확인
    const [rows] = await pool.query('SELECT b_pwd FROM mdb WHERE b_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: '게시글 없음' });
    if (rows[0].b_pwd !== b_pwd) return res.status(403).json({ message: '비밀번호 불일치' });

    await pool.query('DELETE FROM mdb WHERE b_id = ?', [id]);
    res.json({ message: '게시글 삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글 삭제 실패' });
  }
};
