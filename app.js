var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const { TestWatcher } = require("jest");
var app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/todolistDB");

//criar Schema.
const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);

//enviar solicitação para servidor.
app.get("/", async (req, res) => {
  const f = await Item.find({})
  res.json({ newListItem: f });
});

// para enviar modificação.
app.post("/", (req, res) => {
  console.log(req.body);
  const i = req.body.n;
  const item = new Item({
    name: i,
  });
  item.save();
  res.json({ item })
});

// atualiza item
app.put("/item/:id", (req,res) => {
  Item.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, (err, doc) => {
    if(err) res.json({sucesso: false})
    return res.json(doc)
  });
});

//deletar item.
app.delete("/delete", (req, res) => {
  Item.findByIdAndRemove (req.body._id, (err, doc)=> {
    if(err) res.json({sucesso: false})
    return res.json(doc)
  });
});

//abrir projeto dentro de qualquer porta.
app.listen(3001, () => {
  console.log("listening on port 3001.");
});