const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/todolistDB");

//abrir projeto dentro de qualquer porta.
app.listen(3002, () => {
  console.log("listening on port 3002.");
});

// Criando Schema.
const itemSchema = {
  name: String
};

// Iniciamos a model.
const Item = mongoose.model("Item", itemSchema);

// Retorna todos os itens.
app.get("/item", async (req, res) => {
  const item = await Item.find({});
  res.send(item);
});

// Salvar um item.
app.post("/item", async (req, res) => {
  const idData = req.body;
  const item = new Item({
    name: idData.name
  });
  const currentItem = await item.save();
  res.send(currentItem);
});

// Atualizar item
app.put("/item/:id", (req,res) => {
  Item.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, (err, doc) => {
    if(err) res.json({sucesso: false})
    return res.json(doc);
  });
});

// Deletar item.
app.delete("/item/delete", (req, res) => {
  Item.findByIdAndRemove (req.body._id, (err, doc)=> {
    if(err) res.json({sucesso: false})
    return res.json(doc);
  });
});

