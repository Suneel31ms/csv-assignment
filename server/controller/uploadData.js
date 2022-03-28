const csv = require("csvtojson");


function fileUploader(model,fileUrl) {
  return (req, res, next) => {
   
    csv()
      .fromFile(fileUrl)
      .then((jsonObj) => {
        // console.log(jsonObj);

        model.findOne({ Opposition: "v Australia" }).then((data) => {
          if (data) {
            console.log("Collection Already Existt",model);
            res.send("Collection Already Exist, Dn't Duplicate");
          } else {
            model.insertMany(jsonObj, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                res.send({ model: "Updated" });
                console.log(model);
              }
            
            });
          }
        });
      });
  };
}

module.exports = fileUploader