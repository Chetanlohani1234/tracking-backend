const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
//const userRoute = require("./routes/userRoute")
 
const app = express();
const port = 5000;

app.use(express());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());
app.use(bodyParser.json());
//app.use(userRoute);

require("./config/database").connectDb();

require("./config/routes").set_routes(app);

app.use((err, req, res, next) => {
    if(err && err.error && err.error.message){
        res.status(400).send({sucees:false,message:err.error.message})
    }else{
        next()
    }
})

app.listen(port, (req,res)=> {
    console.log(`Server listening on ${port}`);
})