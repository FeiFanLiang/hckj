const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');
const mongooseLeanGetters = require('mongoose-lean-getters');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const newsSchema = new Schema({
        title:{
            type:String,
            maxLength:50
        },
        subTitle:{
            type:String,
            maxLength:300
        },
        type:{
            type:Number
        },
        titlePic:{
            type:String
        },
        content:{
            type:String
        },
        indexShow:{
            type:Boolean,
            default:false
        },
        time:{
            type:Date,
            default:Date.now,
            get:v => moment(v).utcOffset(480).format('YYYY-MM-DD')
        }
    })
    newsSchema.plugin(mongoosePaginate);
    newsSchema.plugin(mongooseLeanGetters);
    return mongoose.model('new',newsSchema);
}