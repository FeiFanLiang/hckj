const mongoosePaginate = require("mongoose-paginate-v2");
const moment = require("moment");
const mongooseLeanGetters = require("mongoose-lean-getters");
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const caseSchema = new Schema({
    title: { type: String,maxLength:20 },
    titlePic: { type: String },
    indexIcon:{type:String},
    navTitle:{type:String,maxLength:10},
    indexShow:{
      type:Boolean,
      default:false
    },
    subTitle: { type: String},
    paragraphTitle_1: { type: String,maxLength:100},
    paragraphContent_1: { type: String },
    paragraphImg_1: { type: String },
    paragraphTitle_2: { type: String,maxLength:100 },
    paragraphContent_2: { type: String,maxLength:500},
    img_1: { type:String },
    img_2: { type: Array,maxLength:2 },
    paragraphContent2Img_1:{
      type:String
    },
    paragraphContent2ImgTitle_1:{
      type:String,
      maxLength:50
    },
    paragraphContent2Img_2:{
      type:String
    },
    paragraphContent2ImgTitle_2:{
      type:String,
      maxLength:50
    },
    paragraphContent2Img_3:{
      type:String
    },
    paragraphContent2ImgTitle_3:{
      type:String,
      maxLength:50
    },
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
