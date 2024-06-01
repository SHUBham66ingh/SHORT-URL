const express=  require('express')
const path = require('path')
const {connectToMongoDB}  = require('./connect')
const urlRoute=require('./routes/url')
const app=express();
const PORT = 8015;
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const { timeStamp } = require('console');

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=> console.log("MongoDb connected"))

app.set("view engine", "ejs" );
app.set('views', path.resolve('./views'))
app.use(express.json())
app.use('/url'  , urlRoute);

app.use(express.urlencoded({extended:false}));



app.get('/:shortId' , async (req,res)=>{
    const shortId = req.params.shortId;
  const entry=  await URL.findOneAndUpdate({
     shortId
    },{$push:{
  visitHistory: {
     timeStamp : Date.now()
  }
    }})
    res.redirect(entry.redirectURL)
})



app.use("/url" , urlRoute);
app.use('/',staticRoute);



app.listen(PORT,()=>console.log(`SEREVER CONNECTED at port:${PORT}`));

