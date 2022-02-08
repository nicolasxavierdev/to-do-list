const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemModel = require('./models/itemModel');

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/todolistDB");

// Inicia a aplicação na porta indicada.
app.listen(3002, () => {
  console.log("listening on port 3002.");
});

// Retorna todos os itens.
app.get("/item", async (req, res) => {
  try {
    const item = await itemModel.find({});
    res.send(item);
  } catch (error) {
    res.statuss(400).json({
      status: "fail",
      message: error
    });
  }
});

// Retorna item por id.
app.get("/item/:id", async (req, res) => {
  const idItem = req.params.id;
  try {
    const item = await itemModel.findById(idItem)
    res.send(item);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    });
  }
});

// cria um novo item.
app.post("/item", async (req, res) => {
  const idData = req.body;
  const item = new itemModel({
    name: idData.name,
    status: idData.status
  });
  try {
    const currentItem = await item.save();
    res.send(currentItem);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    });
  }
});

// Atualiza item
app.put("/item/:id", async (req, res) => {
  const idItem = req.params.id;
  const item = req.body;
  try {
    const itemUpdated = await itemModel.findByIdAndUpdate(idItem, item);
    res.send(itemUpdated);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    });
  }
});

// Remove item.
app.delete("/item/:id", async (req, res) => {
  const idItem = req.params.id;
  try {
    const item = await itemModel.findByIdAndRemove(idItem);
    res.send(item);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    });
  }
});

