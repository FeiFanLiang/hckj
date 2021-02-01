const Controller = require("egg").Controller;

class HelpsController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { pageSize = 30, currentPage = 1 } = ctx.request.body;
    const list = await app.model.Helps.paginate(
      {},
      {
        limit: pageSize,
        page: currentPage,
        lean: {getters:true},
        leanWidthId: true,
        select: "-__v",
        sort: {
          time: -1,
        },
      }
    );
    ctx.success('查询成功',list)
  }

  async queryList() {
    const { ctx, app } = this;
    ctx.validate({
      query: {
        type: "string",
        max: 20,
      },
    },ctx.query);
    const { currentPage = 1, query = '' } = ctx.query;
    const reg = new RegExp(query, "i");
    const list = await app.model.Helps.paginate(
      {
        $or: [
          {
            title: { $regex: reg },
          },
          {
            content: { $regex: reg },
          },
        ],
      },
      {
        limit: 10,
        page: currentPage,
        lean: {getters:true},
        leanWidthId: true,
        select: "-__v -content",
        sort: {
          time: -1
        },
      }
    );
    ctx.success("查询成功", list);
  }

  


  async updateHelp() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: "string",
        allowEmpty:true
      },
      title: {
        type: "string",
        max:100
      },
      content: {
        type: "string",
        allowEmpty:true
      },
    });
    const { title, content, id } = ctx.request.body;
    if(id){
      await app.model.Helps.updateOne(
        {
          _id: app.__mongoose.Types.ObjectId(id),
        },
        {
          title,
          content,
        }
      );
      ctx.success("更新成功");
    }else {
      const newHelp = app.model.Helps({ title, content });
      await newHelp.save();
      ctx.success("添加成功", {
        id: newHelp.id,
        title,
        content,
        time:newHelp.time
      });
    }
    
  }

  async deleteHelp() {
    const { app, ctx } = this;
    ctx.validate(
      {
        id: {
          type: "string",
        },
      },
      ctx.params
    );
    await app.model.Helps.deleteOne({
      _id: app.__mongoose.Types.ObjectId(ctx.params.id),
    });
    ctx.success("删除成功");
  }
}

module.exports = HelpsController;