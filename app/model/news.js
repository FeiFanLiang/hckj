const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');
const mongooseLeanGetters = require('mongoose-lean-getters');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const newsSchema = new Schema({
        title:{
            type:String
        },
        subTitle:{
            type:String
        },
        type:{
            type:Number
        },
        titlePic:{
            type:String
        },
        content:String,
        indexShow:{
            type:Boolean,
            default:false
        },
        time:{
            type:Date,
            default:Date.now,
            get:v => moment(v).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
        }
    })
    newsSchema.plugin(mongoosePaginate);
    newsSchema.plugin(mongooseLeanGetters);
    return mongoose.model('new',newsSchema);
}