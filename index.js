var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Talk = require("./server/model");

let app = express();
let PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

//-------------------------MongoDB config ------------------------------------
const databaseUri = "mongodb://localhost/heroku_pg676kmk"

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGO_URI);
} else {
  mongoose.connect(databaseUri);
}

let db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Route to get all saved talks
app.get("/api/saved", function(req, res) {

  Talk.find({})
    .exec(function(err, doc) {

      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
});

// Route to add a talk to saved list
app.post("/api/saved", function(req, res) {
  var newTalk = new Talk(req.body);

  console.log(req.body);

  newTalk.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Route to delete a talk from saved list
app.delete("/api/saved/", function(req, res) {

  var url = req.param("url");

  Talk.find({ url: url }).remove().exec(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Deleted");
    }
  });
});

// Any non API GET routes will be directed to our React App and handled by React Router
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// -------------------------------------------------

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
