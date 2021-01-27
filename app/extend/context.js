module.exports = {
    success(message,data){
        this.status = 200;
        this.body = {
            code:200,
            message,
            data
        }
    },
    error(message){
        this.status = 200;
        this.body = {
            code:400,
            message
        }
    }
}