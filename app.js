var express = require("express");
    app = express();
    mongoose = require("mongoose");
    bodyParser = require("body-parser");

var todosRoute = require("./routes/todos");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.use("/api/todos", todosRoute);


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});