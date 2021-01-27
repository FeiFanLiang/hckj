const Controller = require('egg').Controller;

class NewController extends Controller {
  async index(){
      const {ctx,service} = this;
      const {pageSize = 30,currentPage = 1} = ctx.request.body;
      const list = await service.news.getNewsList(pageSize,currentPage);
      ctx.success('成功',list)
  }
  
  async addNew(){
      const {ctx,app} = this;
      ctx.validate({
        title:{
            type:"string"
        },
        subTitle:{
            type:"string"
        },
        type:{
            type:"number"
        },
        titlePic:{
            type:"string"
        },
        content:{
            type:"string"
        },
        indexShow:{
            type:"boolean"
        }
      })
      const {title,subTitle,type,titlePic,content,indexShow} = ctx.request.body;
      const newFile = app.model.News({title,subTitle,type,titlePic,content,indexShow});
      await newFile.save();
      ctx.success('添加成功',{
          id:newFile.id,
          title,
          subTitle,
          type,
          titlePic,
          content,
          indexShow,
          time:newFile.time
      })
  }

  async updateNew(){
      const {app,ctx} = this;
      ctx.validate({
        id:{
            type:'string'
        },
        title:{
            type:"string"
        },
        subTitle:{
            type:'string'
        },
        type:{
            type:'number'
        },
        titlePic:{
            type:'string'
        },
        content:{
            type:'string'
        },
        indexShow:{
            type:"boolean"
        }
      })
      const {id,title,subTitle,type,titlePic,content,indexShow} = ctx.request.body;
      await app.model.News.updateOne({
          _id:app.__mongoose.Types.ObjectId(id)
      },{
          title,
          subTitle,
          type,
          titlePic,
          content,
          indexShow
      });
      ctx.success('更新成功')
  }

  async deleteNew(){
      const {app,ctx} = this;
      ctx.validate({
          id:{
              type:"string"
          }
      },ctx.params);
      await app.model.News.deleteOne({
          _id:app.__mongoose.Types.ObjectId(ctx.params.id)
      })
      ctx.success('删除成功')
  }
}

module.exports = NewController;
