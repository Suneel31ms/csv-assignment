const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("Connected - DB");
})

.catch((err) =>{
    console.log(err.message,"Not connected");
}) 