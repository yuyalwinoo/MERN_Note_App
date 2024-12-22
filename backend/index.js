const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { db } = require('./config/database');

//router
const usersRouter = require('./routes/users')
const notesRouter = require('./routes/notes');
const { verifyUserToken } = require("./middleware/auth");

const app = express();

require('dotenv').config();

mongoose.connect(db).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.use(express.json());

app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.get("/",(req,res)=>{
    res.json({data:"hello"})
})
app.use('/api/users', usersRouter);
app.use('/api/notes', verifyUserToken, notesRouter);

app.listen(8000);

module.exports = app;
