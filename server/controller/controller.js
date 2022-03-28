const fs = require("fs");

exports.postFileUpload = (req, res) => {

  ///////////////////////////////////////////////////////////
  // const fileUrl = req.file.path

  //   csv()
  //     .fromFile(fileUrl)
  //     .then((jsonObj) => {
  //       console.log(jsonObj);
  //       console.log(req.file.originalname);

  //       if (req.file.originalname == "sachin_odi.csv") {
  //         OdiDb.insertMany(jsonObj, (err, data) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             // res.redirect("/");
  //             res.send({ odiData: "Uploaded" });
  //           }
  //         });
  //       } else if (req.file.originalname == "sachin_Test_fielding .csv") {
  //         FieldingDb.insertMany(jsonObj, (err, data) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             // res.redirect("/");
  //             res.send({ fieldingData: "Uploaded" });
  //           }
  //         });
  //       } else if (req.file.originalname == "sachin_Test_batting.csv") {
  //         BattingDb.insertMany(jsonObj, (err, data) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             // res.redirect("/");
  //             res.send({ battingData: "Uploaded" });
  //           }
  //         });
  //       }
  //     });
};

//streaming
exports.getChunks = (req, res, next) => {
  const myReadStream = fs.createReadStream(sachin_odi, "utf-8");
  const myWriteStream = fs.createWriteStream(__dirname + "/data.csv", "utf-8");
  myReadStream.on("data", (chunk) => {
    console.log(chunk);
    res.write(chunk);
    // myWriteStream.write(chunk)
  });
  myReadStream.on("end", () => {
    res.end();
  });
  //  myReadStream.pipe(myWriteStreamm)
  res.send("success");
};

