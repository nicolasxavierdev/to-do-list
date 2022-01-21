var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
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
})

//deletar item.
app.delete("/delete", (req, res) => {
  Item.findByIdAndRemove(req.body.checkbox, (err) => {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
});

//abrir projeto dentro de qualquer porta.
app.listen(3001, () => {
  console.log("listening on port 3001.");
});