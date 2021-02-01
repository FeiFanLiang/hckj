const { mode } = require("../../build/webpack.dev.config");
module.exports = (options,app) => {
    return async function (ctx,next) {
        const token = ctx.headers.token ? ctx.headers.token : '';
        try {
            ctx.app.jwt.verify(token,ctx.app.config.jwt.secret);
            await next()
        } catch (error) {
            ctx.status = 200;
            ctx.body ={
                code:50008
            }
        }
    }
}