const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Overs: String,
  Mdns: String,
  Runs: String,
  Wkts: String,
  Econ: String,
  Pos: String,
  Inns: String,
  "Dismisal Made": String,
  "Catch Taken": String,
  Opposition: String,
  Ground: String,
  "Start DateAscending": Date,
  "Match Number": String,
  Result: String,
});

const FieldingDb = mongoose.model("FieldingDb", schema);

module.exports = FieldingDb;
