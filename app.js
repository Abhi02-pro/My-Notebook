const express = require("express");
const bodyarser = require("body-parser");


const app = express();

let list = [];
let notes = [];


app.use(bodyarser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("home", {pageTitle: "Home"});

})


app.get("/list", function(req, res){
    res.render("list", { listTitle: newTitle, pageTitle: "List", listItems: list});
})


let newTitle = "";

app.post("/list", function(req, res){

    if(req.body.listTest === "list"){
        list = [];
        newTitle = req.body.list;
    
    }
    else if(req.body.clearAll === "clear"){
        list = [];
    }
    else if(req.body.goHome === "home"){
        res.redirect("/");
    }
    else if(req.body.addItem === "addNewItem"){
        list.push(req.body.newItem); 
     
    }
    res.redirect("/list");

})


app.get("/notes", function(req,res){
    res.render("notes", { noteTitle: newTitle, pageTitle: "Notes", notesItems: notes});
})


app.post("/notes", function(req, res){
    if(req.body.notesTest === "notes"){
        notes = [];
        newTitle = req.body.notes;
    }
    else if(req.body.clearAll === "clear"){
        notes = [];
    }
    else if(req.body.goHome === "home"){
        res.redirect("/");
    }
    else if(req.body.addItem === "addNewItem"){
        notes.push(req.body.newNote); 
    }
    res.redirect("/notes");
})


app.listen(3000, function(){
    console.log("Server running on port 3000...");
})

