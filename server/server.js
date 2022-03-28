const express = require("express");
const cors =require("cors")
const path = require("path");
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const {errorHandler} = require("./middleware/errorMiddleware")

const app = express();
dotenv.config()
const port = process.env.PORT || 4000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use(express.static(path.resolve(__dirname, "public")));


require("./config/db");


app.use("/", require("./routes/router"));
app.use("/", require("./routes/userRouter"));

app.use(errorHandler);

app.listen(port, () => { 
  console.log(`port-- http://localhost:${port}`);
});
