import express from "express";
import { getNotes, getNote, createNote } from "./database.js";

const app = express();
app.use(express.json());

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.json({ status: "success", notes });
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.json({ status: "success", note });
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = await createNote(title, content);
  res.json({ status: "success", note });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
