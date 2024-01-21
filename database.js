import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// collection of connections to the database
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// const result = await pool.query("SELECT * FROM notes");
// const rows = result[0];

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
}

export async function getNote(id) {
  /*
    We should note pass id directly into query string,
    if we allow untrusted data to be placed with query string, it could lead to SQL injection attacks, 
    where people can get any sort of data they want from your database

    To prevent this, we can use prepared statement:    
    */
  const [row] = await pool.query(
    `
    SELECT *
    FROM notes
    WHERE id = ?
    `,
    [id]
  );
  return row[0];
}

export async function createNote(title, content) {
  const [result] = await pool.query(
    `
    INSERT INTO notes (title, content)
    VALUES (?, ?)
    `,
    [title, content]
  );
  //   return { id: result.insertId, title, content };
  const id = result.insertId;
  return getNote(id);
}

// const createdNote = createNote("Test title", "Test content");
// const notes = await getNotes();
// const id1_note = await getNote(1);
// console.log("Newly created note: ", createdNote);
// console.log("All notes: ", notes);
// console.log("Note with id 1: ", id1_note);
