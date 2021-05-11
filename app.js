const express = require('express');
const body_parser = require('body-parser');
const date = require(__dirname + "/date.js");
const app = express();

// To setup EJS we must have to write this
app.set('view engine','ejs');
let items = [];
let workItems = [];

app.use(body_parser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get('/',function(req,res){
  let day = date.getDate();
  res.render("list",{listTitle : day , newListItem : items});

});

app.post("/",(req,res)=>{
  let item = req.body.newItem;

  if(req.body.list === "Work"  ){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

});


app.get("/work",(req,res)=>{
  res.render("List",{listTitle : "Work List", newListItem : workItems});
});

app.get("/about",(req,res)=>{
  res.render("about");
});


app.listen('3000',()=>{
  console.log('server started on port 3000');
});
