const express = require("express");
const bodyarser = require("body-parser");


const app = express();

let list = [];
let notes = [];

const date = new Date();

app.use(bodyarser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


// Home Page -> GET  Route

app.get("/", function(req, res){
    res.render("home", {pageTitle: "Home"});

})


// List Page -> GET  Route

app.get("/list", function(req, res){
    res.render("list", { date: date.toDateString(), listTitle: newTitle.toUpperCase(), pageTitle: "List", listItems: list});
})


// variable declaration

let newTitle = "";
let iconId = 0;


// List Page -> POST  Route

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
            complete: "invisible",
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
    else if(req.body.tick >= 0){   

        let id = req.body.tick;

        list.forEach(function(item){
            if(item.iconId==id){
                let value = item.complete;
                if(value==="invisible"){
                    item.complete = "visible";
                }
                else if(value==="visible"){
                    item.complete = "invisible";
                }      
            }
            
        })
        

    }
    res.redirect("/list");

})



let noteId = 0;

// Notes Page -> GET  Route

app.get("/notes", function(req,res){
    res.render("notes", { date: date.toDateString(), noteTitle: newTitle.toUpperCase(), pageTitle: "Notes", notesItems: notes});
})


// Notes Page -> POST  Route

app.post("/notes", function(req, res){
    if(req.body.notesTest === "notes"){
        notes = [];
        newTitle = req.body.notes;
        noteId = 0;
    }
    else if(req.body.clearAll === "clear"){
        notes = [];
        noteId = 0;
    }
    else if(req.body.goHome === "home"){
        res.redirect("/");
    }
    else if(req.body.addItem === "addNewItem"){
        const note={
            heading: req.body.heading,
            content: req.body.newNote,
            noteId: noteId,
        }
        notes.push(note); 
        noteId++;
    }
    else if(req.body.delete >= 0){
        let id = req.body.delete;
        notes.forEach(function(note){
            if(note.noteId == id){
                notes.splice(notes.indexOf(note), 1)              
            }
        })
    }

    res.redirect("/notes");
})



// Read Page -> GET Route

app.get("/read", function(req, res){
    res.render("read", { date: date.toDateString(), heading: heading.toUpperCase(), pageTitle: "Read", content: content});
})


// Read Page -> GET Route

app.post("/read", function(req, res){

    if(req.body.read >= 0){

        let id = req.body.read;

        notes.forEach(function(note){
            if(note.noteId == id){
                heading = note.heading;
                content = note.content;                
            }
        })
    }

    else if(req.body.getNotes === "getNotes"){
        res.redirect("/notes");
    }

    else if(req.body.goHome === "home"){
        res.redirect("/");
    }
    
    res.redirect("/read");
    
})

// Listening to Local Server

app.listen(3000, function(){
    console.log("Server running on port 3000...");
})

