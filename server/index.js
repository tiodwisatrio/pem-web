import express from "express";
const app = express();
import { db } from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("HELLO FROM EXPRESS!");
});


// * REGISTER LOGIC
app.post("/api/register", (req, res) => {
  const { nama, tanggal_lahir, username, password } = req.body;
  const sqlInsert =
    "INSERT INTO users (nama, tanggal_lahir, username, password) VALUES (?,?,?,?)";
  const values = [nama, tanggal_lahir, username, password];
  db.query(sqlInsert, values, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// * LOGIN LOGIC
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sqlLogin = "SELECT * FROM users WHERE username = ? AND password = ?";
  const values = [username, password];
  db.query(sqlLogin, values, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (result.length > 0) {
        res.status(200).send(result[0]);
      } else {
        res.status(400).send("Username atau password salah");
      }
    }
  });
});

// * MENAMPILKAN DATA USERS
app.get("/api/users", (req, res) => {
  const sqlGet = "SELECT * FROM users";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// * MENGHAPUS DATA USERS
app.delete("/api/delete/:id", (req, res) => {
  const {id} = req.params;
  const sqlDelete = "DELETE FROM users WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if(err) {
      console.log(err);
    }
  })
})

// * MENGUBAH DATA USERS (UPDATE)
app.get('/api/get/:id', (req, res) => {
  const {id} = req.params;
  const sqlGet = "SELECT * FROM users WHERE id = ?";
  db.query(sqlGet, id, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send(result)
  })
})

app.put("/api/update/:id", (req, res) => {
  const {id} = req.params;
  const {nama, tanggal_lahir, username, password} = req.body;
  const sqlUpdate = "UPDATE users SET nama = ?, tanggal_lahir = ?, username = ?, password = ? WHERE id = ?";
  const values = [nama, tanggal_lahir, username, password, id];
  db.query(sqlUpdate, values, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send(result)

  })
})


// * MENJALANKAN SERVER
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
