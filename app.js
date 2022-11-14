const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const https = require("https");
const date = require( __dirname + "/date.js")

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// let items = ["wake up", "go to college"];
mongoose.connect("mongodb://0.0.0.0:27017/todolistDB", {useNewUrlParser : true});

const itemSchema = new mongoose.Schema({
    name : String
})

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name : "Go to college"
})

const item2 = new Item({
    name : "Go to gym"
})

const item3 = new Item({
    name : "Learn web dev"
})

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, function(err){
//     err ? console.log(err) : console.log("successfully added items");
// })


app.get("/", function(req, res){

   let day = date();

   Item.find(function(err, items){
    if(err){
        console.log(err);
    }else{

        res.render("list", {

            kindOfDay : day,
            newTasks : items
    
        });
    }
    })

})

app.post("/", function(req, res){

    function checked(){
        var checkbox = document.getElementById("checkbox");
        if(checkbox.checked == true){
            console.log("checked");
        }else{
            console.log("not checked");
        }
    }

    let item = req.body.newItem;
    let itemNew = new Item({
        name : item
    })
    itemNew.save();
    res.redirect("/");
    
})

app.post("/delete", function(req, res){
    Item.findByIdAndRemove(req.body.checkbox, function(err){
        if(!err){
            res.redirect("/");
        }
    })
})

app.listen(3000, function(){
    console.log("The server is up and running on port 3000");
})