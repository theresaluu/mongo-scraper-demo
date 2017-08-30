var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TalkSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  url: {
    type: String
  }
});

var Talk = mongoose.model("Talk", TalkSchema);
module.exports = Talk;
