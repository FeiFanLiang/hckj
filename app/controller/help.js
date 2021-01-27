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
        select: "-_id -__v",
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
      currentPage: {
        type: "number",
      },
      query: {
        type: "string",
        max: 20,
      },
    });
    const { currentPage = 1, query = '' } = ctx.request.body;
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
        select: "-_id -__v -content",
        sort: {
          time: -1
        },
      }
    );
    ctx.success("查询成功", list);
  }

  async addHelp() {
    const { ctx, app } = this;
    ctx.validate({
      title: {
        type: "string",
      },
      content: {
        type: "string",
      },
    });
    const { title, content } = ctx.request.body;
    const newHelp = app.model.Helps({ title, content });
    await newHelp.save();
    ctx.success("添加成功", {
      id: newHelp.id,
      title,
      content,
      time:newHelp.time
    });
  }

  async updateHelp() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: "string",
      },
      title: {
        type: "string",
      },
      content: {
        type: "string",
      },
    });
    const { title, content, id } = ctx.request.body;
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