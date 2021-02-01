const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');
const mongooseLeanGetters = require('mongoose-lean-getters');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const helpSchema = new Schema({
        title:{
            type:String,
            maxLength:100
        },
        content:{
            type:String
        },
        time:{
            type:Date,
            default:Date.now,
            get:v => moment(v).utcOffset(480).format('YYYY-MM-DD')
        }
    })
    helpSchema.plugin(mongoosePaginate);
    helpSchema.plugin(mongooseLeanGetters);
    return mongoose.model('help',helpSchema);
}