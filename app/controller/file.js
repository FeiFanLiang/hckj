const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream= require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');


class FileController extends Controller {
  async  upload() {
      const stream = await this.ctx.getFileStream();
      const filePath = path.join(__dirname,'../../fileImgs');
      /(\.\w+)$/.test(stream.filename);
      const fileExtension = RegExp.$1;
      const fileSize = +(this.ctx.req.headers['content-length']);
      if(!RegExp.$1){
        this.ctx.error('filename error')
        return
      }
      const fileName = `${+new Date()}-${stream.filename.replace(/\W/g,'')}${fileExtension}`;
      let target = filePath+'/'+fileName;
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
        this.ctx.success('upload success',{
          url:`/fileImgs/${fileName}`,
          size:fileSize
        })
      } catch (err) {
        await sendToWormhole(stream);
        this.ctx.error('upload error')
      }
      
  }

  async getAllFile(){
    const {app,ctx} = this;
    const list = await app.model.Files.find({}).select('-__v').sort({time:-1}).lean(true);
    list.forEach(el => {
      el.id = el._id;
      delete el._id
    })
    ctx.success('成功',list)
  }

  async getFileList(){
    const {ctx,app} = this;
    const {pageSize = 30,currentPage = 1} = ctx.request.body;
    const list = await app.model.Files.paginate({},{
      limit:pageSize,
      page:currentPage,
      lean:{getters:true},
      select:'-__v',
      leanWidthId:true,
      sort:{
        time:-1
      }
    });
    ctx.success('成功',list)
  }
  async updateFile(){
    const {ctx,app} = this;
    ctx.validate({
      id:{
        type:'string',
        required:false
      },
      name:{
        type:'string',
        min:1,
        max:20
      },
      url:{
        type:'string'
      },
      size:{
        type:'number'
      }
    })
    const {name,url,size,id} = ctx.request.body;
    if(!id){
      const newFile = app.model.Files({name,url,size});
      await newFile.save()
      ctx.success('添加成功',{
        id:newFile.id,
        url:newFile.url,
        size:newFile.size,
        name:newFile.name,
        time:newFile.time
      });
    }else {
      await app.model.Files.updateOne({
        _id:app.__mongoose.Types.ObjectId(id)
      },{
        name
      })
      ctx.success('修改成功')
    }
    
  }
  

  async deleteFile(){
    const {ctx,app} = this;
    ctx.validate({
      id:{
        type:"string",
        required:true
      }
    },ctx.params);
    const {id} = ctx.params;
    const file = await app.model.Files.findById({
      _id:app.__mongoose.Types.ObjectId(id)
    });
    const filePath = path.join(__dirname,'../',file.url);
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
    }
    await app.model.Files.deleteOne({
      _id:app.__mongoose.Types.ObjectId(id)
    })
    ctx.success('删除成功')

  }
}

module.exports = FileController;
