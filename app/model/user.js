const mongoosePaginate = require('mongoose-paginate-v2');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        username:{
            type:String,
            required:true,
            index:true,
            minLength:3,
            maxLength:12
        },
        password:{
            type:String,
            required:true,
            minLength:6,
            maxLength:16
        },
        createTime:{
            type:Date,
            default:Date.now
        }
    })
    userSchema.plugin(mongoosePaginate);
    return mongoose.model('user',userSchema);
}