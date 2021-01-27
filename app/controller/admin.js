const Controller = require('egg').Controller;

class FileController extends Controller {
  async  upload() {
      this;
      const stream = await this.ctx.getFileStream();
      const filePath = path.join(__dirname,'../public/imgs');
      const fileName = `${+new Date()}-${stream.filename}`;
      let target = filePath+'/'+fileName;
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        this.ctx.status = 200;
        this.ctx.body = {
            code:400,
            message:"upload error"
        }
      }
      this.ctx.status = 200;
      this.ctx.body = {
          code:200,
          message:"upload success",
          data:`/public/imgs/${fileName}`
      }
  }
}

module.exports = FileController;
