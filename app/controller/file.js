const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream= require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class FileController extends Controller {
  async  upload() {
      const stream = await this.ctx.getFileStream();
      const filePath = path.join(__dirname,'../public/imgs');
      /(\.\w+)$/.test(stream.filename);
      const fileExtension = RegExp.$1;
      const fileSize = stream.readableLength;
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
          url:`/public/imgs/${fileName}`,
          size:fileSize
        })
      } catch (err) {
        await sendToWormhole(stream);
        this.ctx.error('upload error')
      }
      
  }
  async getFileList(){
    const {ctx,app} = this;
    const {pageSize = 30,currentPage = 1} = ctx.request.body;
    const list = await app.model.Files.paginate({},{
      limit:pageSize,
      page:currentPage,
      lean:true,
      select:'-_id -__v',
      leanWidthId:true,
      sort:{
        time:-1
      }
    })
    ctx.success('成功',list)
  }
  async addFile(){
    const {ctx,app} = this;
    ctx.validate({
      name:{
        type:'string',
        required:true,
        min:1,
        max:20
      },
      url:{
        type:'string',
        required:true
      },
      size:{
        type:'number',
        required:true
      }
    })
    const {name,url,size} = ctx.request.body;
    const newFile = app.model.Files({name,url,size});
    await newFile.save()
    ctx.success('添加成功',{
      id:newFile.id,
      url:newFile.url,
      size:newFile.size,
      name:newFile.name,
      time:newFile.time
    });
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
