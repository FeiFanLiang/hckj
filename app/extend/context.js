const { render } = require('../utils/utils.js');
module.exports = {
    success(message,data){
        this.status = 200;
        this.body = {
            code:200,
            message,
            data
        }
    },
    async notFound(){
        this.status = 200;
        await render(this,'notFound.ejs')
    },
    error(message){
        this.status = 200;
        this.body = {
            code:400,
            message
        }
    }
}