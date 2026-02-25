import express from "express";
import db from "../db.js";

const router = express.Router();

// GET TODOS
router.get("/", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD TODO
router.post("/", (req, res) => {
  const { text } = req.body;

  db.query(
    "INSERT INTO todos (text) VALUES (?)",
    [text],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, text });
    }
  );
});

// DELETE TODO
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM todos WHERE id = ?",
    [req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted" });
    }
  );
});

export default router;