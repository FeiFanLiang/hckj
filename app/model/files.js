const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const fileSchema = new Schema({
        name:{
            type:String,
            required:true,
            index:true
        },
        url:String,
        size:{
            type:Number,
            get:v => `${Math.ceil(v/1024)}KB`
        },
        time:{
            type:Date,
            default:Date.now,
            get:v => moment(v).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
        }
    })
    fileSchema.plugin(mongoosePaginate);
    return mongoose.model('file',fileSchema);
}