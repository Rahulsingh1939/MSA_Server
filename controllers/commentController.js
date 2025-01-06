import { pool } from "../config/pool";

export const commentController = async (req, res) => {
  const { post_id } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1",
      [post_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCommentController = async (req, res) => {
  const { postId, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comments (post_id, content, user_id) VALUES ($1, $2, $3) RETURNING id, content",
      [postId, content, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
