const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  batting_score: {
    type:String,
    autoIndexId: true
  },
  wickets: String,
  runs_conceded: String,
  catches: String,
  stumps: String,
  opposition: String,
  ground: String,
  date: Date,
  match_result: String,
  result_margin: String,
  toss: String,
  batting_innings: String,
});

const OdiDb = mongoose.model("OdiDb", schema);

module.exports = OdiDb;
