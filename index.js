var express =require("express")
var cors =require("cors")
var bodyParser =require("body-parser")
var mongoose =require("mongoose")
mongoose.set('strictQuery', true);
var ObjectID = require('mongodb').ObjectId
var multer = require('multer');
var path =require("path")
const  {GridFsStorage}  = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
const fs = require("file-system")
var app = express();



app.use (cors({
  credentials:true,
  origin:["http://localhost:4200"]
    
}));
console.log(" ok")
app.use ("*",(req, res, next) =>{
  res.header("Access-Conssstrol-Allow-Orgin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PATCH< DELETE" );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // console.log("cores ok")
  next();
})







app.use(express.static(path.join(__dirname,'dist/infrontend')));
app.get('*', (req, res) => {
 res.sendFile('index.html', {root: 'dist/infrontend'});
});







var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');


   socket.on('getLikes', async (data) => {
    const objectId = new ObjectID(`${data._id}`);
  const likes = await db.collection("uploads.files").findOne({"_id": objectId  });
  io.emit('likes', { post_id: data._id, likes: likes.likes });
  // console.log(likes)
 })
  // Listen to the 'like' event
  socket.on('like', async (data) => {
      try {
          const objectId = new ObjectID(`${data._id}`);
          // console.log(objectId)
         var  x= await db.collection("uploads.files").findOneAndUpdate({ "_id": objectId }, { $inc: { likes: 1 } }, { upsert: true });
              // console.log(x)
        //  Emit the updated number of likes to all connected clientss
          const likes = await  db.collection("uploads.files").findOne({"_id": objectId  });
          io.emit('likes', { post_id: data._id, likes: likes.likes });
          // console.log(likes)

      } catch (err) {
          console.error(err);
      }
  });
// });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = 3000;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});




app.use(express.static("upload"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))





mongoose.connect('mongodb://127.0.0.1:27017/bhanu',{
    useNewUrlParser: true,
    useUnifiedTopology: true
},{poolSize: 10});
var db = mongoose.connection;
 db.on('error',()=>console.log("error in connecting database"));
 db.once('open',()=>console.log("Connected to Database"))
 db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});






const fileSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
});



 var gfs;
db.once('open', () => {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log("open database success")
});
const storage = new GridFsStorage({
  url: 'mongodb://127.0.0.1:27017/bhanu',
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({ storage });
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});










var gfs, gridfsBucket;
db.once('open', () => {
 gridfsBucket = new mongoose.mongo.GridFSBucket(db.db, {
 bucketName: 'uploads'
});

 gfs = Grid(db.db, mongoose.mongo);
 gfs.collection('uploads');
})


app.get("/image/:_id", async function(req, res){ 
        // console.log( req.params)
        const objectId = new ObjectID(`${req.params._id}`);
        const file = await gfs.files.findOne({_id:objectId });
        // console.log(file)
        var readstream = gridfsBucket.openDownloadStream(file._id); 
        // console.log(readstream)
        // readstream.on("error", function(err){
        //     res.send("No image found with that title"); 
        // });
        readstream.pipe(res);
       

    });
    app.post("/image", async function(req, res){ 
      // console.log( req.params)
      const objectId = new ObjectID(`${req.body._id}`);
      const file = await gfs.files.findOne({_id:objectId });
      // console.log(file)
      var readstream = gridfsBucket.openDownloadStream(file._id); 
      // console.log(readstream)
      // readstream.on("error", function(err){
      //     res.send("No image found with that title"); 
      // });
      readstream.pipe(res);
     

  });








app.post("/api/friendsdata",async(req,res)=>{
  
  let data= await db.collection('datas').find().toArray()
   return res.send({data})
 });










 app.post("/api/mydata",async(req,res)=>{
  const objectId = new ObjectID(`${req.body._id}`);
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})
 var x = mydata.conformfriendid
 var y =[]
 for(let items of x){
  const objectIds = new ObjectID(`${items}`);
  var mydatas = await db.collection("datas").findOne({ "_id" : objectIds})
  y.push(mydatas)
 }
   return res.send({y})
 });




 app.post("/api/mydataotherimage",async(req,res)=>{
  //  console.log(req.params._id)
  const objectId = new ObjectID(`${req.body._id}`);
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})
 var x = mydata.conformfriendid
  // console.log(x)
 var y =[]
 for(let items of x){
  //  console.log(items)
  const objectIds = new ObjectID(`${items}`);
  var mydatas = await db.collection("datas").findOne({ "_id" : objectIds})
  y.push(mydatas.myphotoid)
   console.log(y)
 }
 var z =[]
 for(let i=1; i<y.length;i++){
   
    var k =y[i]
   z.push(k) 
    // console.log(z)
 }
   console.log(z)
   return res.send({z})
 });

 
 app.post("/api/myotherselfimg",async(req,res)=>{
  const objectId = new ObjectID(`${req.body._id}`);
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})
 var x = mydata.conformfriendid
 var y =[]
//  console.log(x)
 for(let i=1;i<x.length;i++){
  const objectIds = new ObjectID(`${x[i]}`);
  // console.log(objectIds)
  var mydatas = await db.collection("datas").findOne({ "_id" : objectIds})
  y.push(mydatas.myselfphotoid)
  // console.log(y)
 }
//  console.log(y)
return res.send({y})
 });


 app.post("/api/mydataselfimage",async(req,res)=>{
  const objectId = new ObjectID(`${req.body._id}`);
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})
// console.log(mydata.myselfphotoid)
if(mydata.myselfphotoid!==undefined){
   const x = mydata.myselfphotoid
  //  console.log(x)
   return res.send({x})
}
else{
  const x="641d4cd3898bdbd96040cc7e"
  // console.log("ok")
  return res.send({x})
}
//  var x = mydata.myselfphotoid
  //  console.log(x)
  //  return res.send({x})
 });
























 app.post("/api/mydataphotoid",async(req,res)=>{
  const objectId = new ObjectID(`${req.body._id}`);
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})
 var x = mydata.myphotoid
  //  console.log(x)
   return res.send({x})
 });

 








 app.put("/api/postmyimageid/:_id",async(req,res)=>{
  const otherid =req.body.myphotoid;
  const reqbodyaddfriendid=req.params;
  // console.log(otherid)
  // console.log(reqbodyaddfriendid)
  const objectId = new ObjectID(`${req.params._id}`);
  var result = await db.collection("datas").updateOne( { _id:objectId},
  { $push : {myphotoid:otherid}});
 
   if(result={modifiedCount: 1}){
       res.send({otherid })
   }

})


app.put("/api/postmyimageidatself/:_id",async(req,res)=>{
  const otherid =req.body.myphotoid;
  const reqbodyaddfriendid=req.params;
  // console.log(otherid)
  // console.log(req.body)
  const objectId = new ObjectID(`${req.params._id}`);
  var result = await db.collection("datas").updateOne( { _id:objectId},
  { $set: {myselfphotoid:otherid}});
 
   if(result={modifiedCount: 1}){
       res.send({otherid })
   }

})



// app.put("/api/postmyimageidatselfurl/:_id",async(req,res)=>{
  
//   const otherid =req.body.selfimagesrc;
//   console.log(req.body )

//   // console.log(otherid )
//   // const reqbodyaddfriendid=req.params;
//   // // console.log(otherid)
//   // // console.log(reqbodyaddfriendid)
//   // const objectId = new ObjectID(`${req.params._id}`);
//   // var result = await db.collection("datas").updateOne( { _id:objectId},
//   // { $set: {myselfphotoidsrc:otherid}});
 
//   //  if(result={modifiedCount: 1}){
//   //      res.send({otherid })
//   //  }

// })

 app.put("/api/registeraddconform/:_id",async(req,res)=>{
  const otherid =req.params
  // console.log(otherid)
  // console.log(req.body)
  // console.log(req.body.conformaddfriendids)
  var reqbodyaddfriendid=req.body.conformaddfriendids[0]
  var reqbodyconformfriendid = (req.body.conformaddfriendids[1])
  const objectId = new ObjectID(`${req.params._id}`);
  var result = await db.collection("datas").updateMany( { _id:objectId},
  { $set : {addfriendid:[reqbodyaddfriendid],conformfriendid:[reqbodyconformfriendid],myaddfriendid:[reqbodyaddfriendid],myconformfriendid:[reqbodyconformfriendid],myphotoid:[reqbodyconformfriendid]}});
  console.log(result)


})



app.post("/api/myallconformfriendsidmy",async(req,res)=>{
  app.use(bodyParser.json());
   const objectId = new ObjectID(`${req.body.addfriendid}`);
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})
  if(mydata.myaddfriendid){
    var totaladdfriendid=mydata.myconformfriendid
    // console.log(totaladdfriendid)
  res.send({totaladdfriendid})
  }
else{
  res.send({res:false})

}
 })




app.post("/api/myalladdfriendsidmy",async(req,res)=>{
  app.use(bodyParser.json());
   const objectId = new ObjectID(`${req.body.addfriendid}`);
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})
 
  if(mydata.myaddfriendid){
    var totaladdfriendid=mydata.myaddfriendid
  
  res.send({totaladdfriendid})
  }
else{
  res.send({res:false})

}
 })




app.post("/api/allconformfriendsidmy",async(req,res)=>{
  app.use(bodyParser.json());
   const objectId = new ObjectID(`${req.body.addfriendid}`);
  
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})

  if(mydata.conformfriendid){
    var totalconformfriendid =mydata.conformfriendid
// console.log(totalconformfriendid)
 
  res.send({totalconformfriendid})
  }else{
    res.send({res:false})
  }
})


app.post("/api/alladdfriendsidmy",async(req,res)=>{
  app.use(bodyParser.json());
   const objectId = new ObjectID(`${req.body.addfriendid}`);
  var mydata = await db.collection("datas").findOne({ "_id" : objectId})
 
  if(mydata.addfriendid){
    var totaladdfriendid=mydata.addfriendid
  res.send({totaladdfriendid})
  }
else{
  res.send({res:false})

}
 })

app.put("/api/conformfriend/:_id",async(req,res)=>{
  const otherid =req.params
  const reqbodyaddfriendid=req.body.addfriendid;
  const objectId = new ObjectID(`${req.params._id}`);
  const objectIds = new ObjectID(`${req.body.addfriendid}`);
  var result = await db.collection("datas").updateOne( { _id:objectId},
  { $push : {conformfriendid:reqbodyaddfriendid}});
 

  var results = await db.collection("datas").updateOne( { _id:objectIds},
    { $push : {myconformfriendid:otherid._id}});

  // console.log(results)
  // console.log(result)
   if(result={modifiedCount: 1}){
       res.send({otherid })
   }

})


app.put("/api/addfriend/:_id",async(req,res)=>{
  const otherid =req.params
  // console.log(req.params)
  // console.log(req.body.addfriendid)
  var reqbodyaddfriendid=req.body.addfriendid
  const objectId = new ObjectID(`${req.params._id}`);
  const objectIds = new ObjectID(`${req.body.addfriendid}`);
  var result = await db.collection("datas").updateOne( { _id:objectId},
  { $push : {addfriendid:reqbodyaddfriendid}});

  var results = await db.collection("datas").updateOne( { _id:objectIds},
    { $push : {myaddfriendid:otherid._id}});
// console.log(results)
//  console.log(result)
   if(result){
       res.send({otherid })
   }
   else{
    res.send({result:false})
   }

})








const Schema = mongoose.Schema;

const MySchema = new Schema({
  _id: mongoose.Types.ObjectId,
 
});










app.post("/api/friendsdatacancel",async(req,res)=>{
  app.use(bodyParser.json());
  // console.log(req.body._id)

 const objectId = new ObjectID(`${req.body._id}`);
  
  // console.log(objectId); 

  
  var deletedata = await db.collection("datas").deleteOne({ "_id" : objectId})
  // console.log(deletedata)
if(deletedata= {deletedCount: 1 } ){
   res.send({res:true})
}
else{
  res.send({res:false})
}
})




  












app.get('/entry', (req, res) => {
  console.log("entter")
  res.sendFile('index.html', {root: 'dist/Frontend'});
});









app.post("/api/login_in",async(req,res)=>{
  console.log(req.body)
  try{
     console.log("hi")
     const emails =req.body.pemail;
     const passwords =req.body.ppassword;
     
var userdata = await db.collection('datas').findOne({email:emails});

if (userdata.password===passwords) {
     console.log(userdata)
      res.send({userdata})
     }  
   else{
      res.send({results:false});
   }
    }
  catch(error){
     res.send({results:false})
  }
})






app.post("/api/register",async(req,res)=>{
  app.use(bodyParser.json());
  var name = req.body.name;
  var email = req.body.gmail;
 
 
  var phno = req.body.phno;
  var password = req.body.password;
  var user = {
     "email" : email,
      "name": name,
     
      "phno": phno,
      "password" : password
  } 
 var collection=await db.collection('datas').insertOne(user)
        console.log("Record Inserted Successfully");
        var data = collection.insertedId
      res.send({data})    
      
  });     


app.get('/api/photos', function (req, res) {
  console.log("hello")
  const bucket = new mongodb.GridFSBucket(db);
  const videoUploadStream = bucket.openUploadStream('bigbucks');
  const videoReadStream = fs.createReadStream('../ass');
  videoReadStream.pipe(videoUploadStream);
  console.log("uploa")
  // res.sendFile(__dirname + "/home.html");
  res.send("upload successfully");
});



 app.listen(4000,()=>{
 console.log("listen by http://localhost:4000")
 })

