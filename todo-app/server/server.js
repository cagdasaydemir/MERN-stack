import express from "express";
import mongoose from "mongoose";
import { Todo } from "./models/Todo.js";
import cors from "cors";

const PORT = 8000;
const MONGO_CONNECTION =
  "mongodb+srv://dbAdmin:kYcHGTi3mMocN4t3@cluster0.kkv3s47.mongodb.net/todoDb?retryWrites=true&w=majority";
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//mongodb bağlantı işlemleri

mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Veritabanına başarılı bir şekilde bağlanıldı");
  })
  .catch((err) => {
    console.log("veritabanı bağlantı hatası: " + err);
  });

// GET, POST, PUT, PATCH
app.post("/todo", async (req, res) => {
  const reqBody = req.body;
  const createdTodo = new Todo(reqBody);

  const validate = createdTodo.validateSync();
  if (validate?.errors) {
    res.status(400).json({ errors: validate.errors });
  } else {
    createdTodo
      .save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        res.status(500).json({ errors: err });
      });
  }
});

app.get("/todo", async (req, res) => {
  try {
    const result = await Todo.find().exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ errors: err });
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    const result = await Todo.findById(req.params.id).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ errors: err });
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Todo.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ errors: err });
  }
});

app.patch("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todoDoc = await Todo.findById(id);

    if (todoDoc) {
      todoDoc.isCompleted = !todoDoc.isCompleted;
      await todoDoc
        .save()
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((err) => {
          res.status(500).json({ errors: err });
        });
    } else {
      res
        .status(500)
        .json({ errors: { message: "Lütfen geçerli bir Todo giriniz" } });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
});

 

app.listen(PORT, () => {
  console.log(`Uygulama ${PORT} portunda yayınlandı`);
});
