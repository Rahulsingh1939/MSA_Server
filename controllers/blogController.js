import { pool } from "../config/pool";

export const allblogController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const result = await pool.query("SELECT * FROM blogs LIMIT $1 OFFSET $2", [
      limit,
      offset,
    ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const blogController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).send("Blog not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const editBlogController = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await pool.query(
      "UPDATE blogs SET title = $1, content = $2 WHERE id = $3",
      [title, content, id]
    );
    res.send("Blog updated successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteBlogController = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
    res.send("Blog deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
