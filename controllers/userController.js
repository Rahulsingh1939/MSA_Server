import { pool } from "../config/pool";

export const detailController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return res.status(404).send("User not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const authenticateController = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "UPDATE users SET username = $1, password = $2 WHERE id = $3",
      [username, hashedPassword, id]
    );
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteController = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
