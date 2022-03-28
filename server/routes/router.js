const express = require("express");
const router = express.Router();
const path = require("path");

const { getChunks } = require("../controller/controller");
const fileUploader = require("../controller/uploadData");
const resultWithPagination = require("../controller/result-pagination");
const BattingDb = require("../model/batting-model");
const FieldingDb = require("../model/fielding-model");
const OdiDb = require("../model/odi-model");

///////////////
const sachin_odi = path.resolve(__dirname, "../public/uploads/sachin_odi.csv");
const sachin_batting = path.resolve(
  __dirname,
  "../public/uploads/sachin_Test_batting.csv"
);
const sachin_fielding = path.resolve(
  __dirname,
  "../public/uploads/sachin_Test_fielding .csv"
);
//////////////

// const uploads = require("../middleware/upload");

//upload a File
router.post("/odi", fileUploader(OdiDb, sachin_odi));
router.post("/fielding", fileUploader(FieldingDb, sachin_fielding));
router.post("/batting", fileUploader(BattingDb, sachin_batting));


//GET API's
router.get("/odi", resultWithPagination(OdiDb));
router.get("/fielding", resultWithPagination(FieldingDb));
router.get("/batting", resultWithPagination(BattingDb));

router.get("/chunk", getChunks);

module.exports = router;
