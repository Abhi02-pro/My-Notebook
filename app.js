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
let iconId = 0;

app.post("/list", function(req, res){

    if(req.body.listTest === "list"){
        list = [];
        iconId=0;
        newTitle = req.body.list;
    }
    else if(req.body.clearAll === "clear"){
        list = [];
        iconId=0;
    }
    else if(req.body.goHome === "home"){
        res.redirect("/");
    }
    else if(req.body.addItem === "addNewItem"){
        const item = {
            itemName: req.body.newItem,
            iconId: iconId,
        }
        list.push(item); 
        iconId++;
    }
    else if(req.body.delete >= 0){
        let id = req.body.delete;
        list.forEach(function(item){
            if(item.iconId==id){
                list.splice(list.indexOf(item), 1);
            }
            
        })
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

