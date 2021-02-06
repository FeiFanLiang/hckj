const Controller = require('egg').Controller;

class NewController extends Controller {
  async index(){
      const {ctx,service} = this;
      const {pageSize = 30,currentPage = 1} = ctx.request.body;
      const list = await service.news.getNewsList(pageSize,currentPage);
      ctx.success('成功',list)
  }
  
 
  

  async updateNew(){
      const {app,ctx} = this;
      ctx.validate({
        id:{
            type:'string',
            allowEmpty:true
        },
        title:{
            type:"string",
            max:50
        },
        subTitle:{
            type:'string',
            max:300
        },
        type:{
            type:'number'
        },
        titlePic:{
            type:'string'
        },
        content:{
            type:'string',
            allowEmpty:true
        },
        indexShow:{
            type:"boolean"
        },
        time:{
            type:'date'
        }
      })
      const {id,title,subTitle,type,titlePic,content,indexShow,time} = ctx.request.body;
      if(id){
        await app.model.News.updateOne({
            _id:app.__mongoose.Types.ObjectId(id)
        },{
            title,
            subTitle,
            type,
            titlePic,
            content,
            indexShow,
            time
        });
        ctx.success('更新成功')
      }else {
        const newFile = app.model.News({title,subTitle,type,titlePic,content,indexShow,time});
        await newFile.save();
        ctx.success('添加成功',{
            id:newFile.id,
            title,
            subTitle,
            type,
            titlePic,
            content,
            indexShow,
            time:time
        })
      }
      
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
