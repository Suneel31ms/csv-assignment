const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Runs: String,
  Mins: String,
  BF: String,
  "4s": String,
  "6s": String,
  SR: String,
  Pos: String,
  Dismissal: String,
  Inns: String,
  Opposition: String,
  Ground: String,
  "Start DateAscending": Date,
  "Match Number": String,
  Result: String,
});

const BattingDb = mongoose.model("BattingDb", schema);

module.exports = BattingDb;
