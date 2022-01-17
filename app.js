var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/todolistDB");

//criar Schema.
const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);

//criar uma instância.
const item1 = new Item({ name: "Arroz" });
const item2 = new Item({ name: "Feijão" });
const item3 = new Item({ name: "Macarrão" });

const d = [item1, item2, item3];

//enviar solicitação para servidor.
app.get("/", function (req, res) {
  Item.find({}, function (err, f) {
    if (f.length === 0) {
      Item.insertMany(d, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved items to database");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { newListItem: f });
    }
  });
});

// para enviar modificação.
app.post("/", function (req, res) {
  i = req.body.n;
  const item = new Item({
    name: i,
  });
  item.save();
  res.redirect("/");
})

//deletar item.
app.post("/delete", function (req, res) {
  Item.findByIdAndRemove(req.body.checkbox, function (err) {
    if (!err) {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
});

//abrir projeto dentro de qualquer porta.
app.listen(3001, function () {
  console.log("listening on port 3001.");
});