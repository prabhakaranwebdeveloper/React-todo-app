import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "429201",
  database: "React_todo_app",
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed", err);
    return;
  }
  console.log("MySQL Connected");
});

export default db;