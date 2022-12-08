import express from "express";
const app = express();
import { db } from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("HELLO FROM EXPRESS!");
});

// app.get("/test", (req, res) => {
//   const sqlView = "SELECT * FROM users";
//   db.query(sqlView, (err, result) => {
//     if (err) {
//       res.send("ERROR");
//     } else {
//       res.send("SUCCESS CONNECTED");
//     }
//   });
// });

// * REGISTER LOGIC
app.post("/api/register", (req, res) => {
  const { nama, tanggal_lahir, username, password } = req.body;

  //Hashing password dan membuat user baru
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  
  const sqlInsert =
    "INSERT INTO users (nama, tanggal_lahir, username, password) VALUES (?,?,?,?)";
  const values = [nama, tanggal_lahir, username, hash];
  db.query(sqlInsert, values, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});


// * MENJALANKAN SERVER
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
