const Controller = require('egg').Controller;

class FileController extends Controller {
  async login(){
    const {app,ctx} = this;
    ctx.validate({
      username:{
        type:'string',
        required:true,
        min:3,
        max:12
      },
      password:{
        type:'string',
        required:true,
        min:6,
        max:16
      }
    })
    const userExits = await app.model.User.findOne({
      username:"admin"
    });
    if(!userExits){
      const newUser = new app.model.User({
        username:'admin',
        password:'hckjadmin1234'
      })
      await newUser.save()
    }
    const {username,password} = ctx.request.body;
    const user = await app.model.User.findOne({
      username,
      password
    })
    if(user){
      const token = app.jwt.sign({
        name:user.name
      },app.config.jwt.secret,{
        expiresIn:'72h'
      });
      ctx.success('登录成功',{token})
    }else {
      ctx.error('密码错误')
    }
  }
  async updatePassword(){
    const {app,ctx} = this;
    ctx.validate({
      oldPassword:{
        type:'string',
        required:true,
        min:6,
        max:16
      },
      newPassword:{
        type:'string',
        required:true,
        min:6,
        max:16
      }
    });
    const {oldPassword,newPassword} = ctx.request.body;
    const user = await app.model.User.findOne({
      username:"admin",
      password:oldPassword
    })
    if(user && user.username){
      user.password = newPassword;
      await user.save()
    }
    ctx.success('修改成功')
  }
}

module.exports = FileController;
