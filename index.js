const express=require('express');
const app=express();
const cors=require('cors');
var crypto = require('crypto');
const md=require('mongodb').MongoClient;
const url='mongodb+srv://new:newuser123@new1.hf4a0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//const url='mongodb://127.0.0.1:27017';
const bodyParser = require("body-parser");
var x,y,mi='';
const csv=require('csv-parser');
const fs=require('fs');
const results=[];
app.use(bodyParser.json({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(cors());

app.post('/Add',(req,res)=>{
md.connect(url,(err,db)=>{
  if(err) throw err;
  var dbmy=db.db('jo');
var t=req.body;
var mm=[];
for(var i=0;i<t.length;i++)
{if(t[i].hasOwnProperty('password'))
  {
     var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(t[i].password,salt, 1000, 64, `sha512`).toString(`hex`);
    t[i].password=hash;
    //console.log(t[i].password);
  mm.push(t[i]);
  }
}
  console.log(req.body[0]);
  console.log(mm[0]);
  var datacsv;
  if(req.body[0].hasOwnProperty('password')){
datacsv=mm;
  }
  else{
  var datacsv=req.body;
}
  dbmy.collection('new').insertMany(datacsv,(err,res)=>{
    if(err){ console.log(err);
    }
   console.log("chan");
    mi="u";
    db.close()
  });
  });
if(mi==='u'){
  res.send("ins");
}
else
  {
    res.send("nins");
  }
});

app.get('/',(req,res)=>{
  res.send("hi");
});
const port=process.env.PORT||5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
