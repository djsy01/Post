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

// 게시글 단건 조회
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

  const b_filename = req.file ? req.file.filename : null;
  const b_filesize = req.file ? req.file.size.toString() : null;

  console.log('req.body:', req.body);
  console.log('req.file:', req.file);

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

// 게시글 수정
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { b_name, b_title, b_mail, b_content, b_pwd } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM mdb WHERE b_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: '게시글 없음' });
    if (rows[0].b_pwd !== b_pwd) return res.status(403).json({ message: '비밀번호 불일치' });

    const b_filename = req.file ? req.file.filename : rows[0].b_filename;
    const b_filesize = req.file ? req.file.size.toString() : rows[0].b_filesize;

    await pool.query(
      `UPDATE mdb SET b_name = ?, b_title = ?, b_mail = ?, b_content = ?, b_filename = ?, b_filesize = ? WHERE b_id = ?`,
      [b_name, b_title, b_mail, b_content, b_filename, b_filesize, id]
    );

    res.json({ message: '게시글 수정 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글 수정 실패' });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const { pwd } = req.query;

  try {
    const [rows] = await pool.query('SELECT b_pwd FROM mdb WHERE b_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: '게시글 없음' });
    if (rows[0].b_pwd !== pwd) return res.status(403).json({ message: '비밀번호 불일치' });

    await pool.query('DELETE FROM mdb WHERE b_id = ?', [id]);
    res.json({ message: '게시글 삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '게시글 삭제 실패' });
  }
};