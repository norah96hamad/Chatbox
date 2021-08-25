let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let obj = require("mongoose");
let url = "mongodb://localhost:27017/mern";
let cors = require("cors");
app.use(cors());

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

obj.connect(url,options).then(res=>console.log("connected")).catch(error=>console.log(error));
let db = obj.connection; 

let chatSchema = obj.Schema({
    _id:Number,
    userMessage:String,
});

let chatModel = obj.model("",chatSchema,"Chatbox");

//http://localhost:9090/first
app.get("/first",(req,res)=> {
    res.sendFile(__dirname+"/index1.html");
})

//http://localhost:9090/second
app.get("/second",(req,res)=> {
    res.sendFile(__dirname+"/index2.html");
})

io.on("connection",(socket)=>{
    socket.on("obj",(msg)=>{
        console.log(msg);
        let storeChat =chatModel({userMessage:msg});
        chatModel.insertMany(storeChat,(err,result)=>{
            if(err){
                console.log(err);
            }
        })
    })
})





http.listen(9090,()=> console.log("Server running on port 9090"));