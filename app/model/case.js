const mongoosePaginate = require("mongoose-paginate-v2");
const moment = require("moment");
const mongooseLeanGetters = require("mongoose-lean-getters");
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const caseSchema = new Schema({
    title: { type: String },
    titlePic: { type: String },
    subTitle: { type: String },
    paragraphTitle_1: { type: String },
    paragraphContent_1: { type: String },
    paragraphImg_1: { type: String },
    paragraphTitle_2: { type: String },
    paragraphContent_2: { type: String },
    img_1: { type: Array },
    img_2: { type: Array },
    time: {
      type: Date,
      default: Date.now,
      get: (v) => moment(v).utcOffset(480).format("YYYY-MM-DD HH:mm:ss"),
    },
  });
  caseSchema.plugin(mongoosePaginate);
  caseSchema.plugin(mongooseLeanGetters);
  return mongoose.model("case", caseSchema);
};
