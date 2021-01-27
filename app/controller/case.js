const Controller = require("egg").Controller;

class CaseController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { pageSize = 30, currentPage = 1 } = ctx.request.body;
    const list = await app.model.Case.paginate(
      {},
      {
        limit: pageSize,
        page: currentPage,
        lean: true,
        leanWidthId: true,
        select: "-_id -__v",
        sort: {
          time: -1,
        },
      }
    );
    ctx.success("查询成功", list);
  }

  async addCase() {
    const { ctx, app } = this;
    ctx.validate({
      title: {
        type: "string",
      },
      titlePic: {
        type: "string",
      },
      subTitle: {
        type: "string",
      },
      paragraphTitle_1: {
        type: "string",
      },
      paragraphContent_1: {
        type: "string",
      },
      paragraphImg_1: {
        type: "string",
      },
      paragraphTitle_2: {
        type: "string",
      },
      paragraphContent_2: {
        type: "string",
      },
      img_1: {
        type: "array",
        min: 1,
      },
      img_2: {
        type: "array",
        min: 1,
      },
    });
    const {
      title,
      titlePic,
      subTitle,
      paragraphTitle_1,
      paragraphContent_1,
      paragraphImg_1,
      paragraphTitle_2,
      paragraphContent_2,
      img_1,
      img_2,
    } = ctx.request.body;
    const newCase = app.model.Case({
      title,
      titlePic,
      subTitle,
      paragraphTitle_1,
      paragraphContent_1,
      paragraphImg_1,
      paragraphTitle_2,
      paragraphContent_2,
      img_1,
      img_2,
    });
    await newCase.save();
    ctx.success("添加成功", {
      id: newCase.id,
      title,
      titlePic,
      subTitle,
      paragraphTitle_1,
      paragraphContent_1,
      paragraphImg_1,
      paragraphTitle_2,
      paragraphContent_2,
      img_1,
      img_2,
    });
  }

  async updateCase() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: "string",
      },
      title: {
        type: "string",
      },
      titlePic: {
        type: "string",
      },
      subTitle: {
        type: "string",
      },
      paragraphTitle_1: {
        type: "string",
      },
      paragraphContent_1: {
        type: "string",
      },
      paragraphImg_1: {
        type: "string",
      },
      paragraphTitle_2: {
        type: "string",
      },
      paragraphContent_2: {
        type: "string",
      },
      img_1: {
        type: "array",
        min: 1,
      },
      img_2: {
        type: "array",
        min: 1,
      },
    });
    const {
      title,
      titlePic,
      subTitle,
      paragraphTitle_1,
      paragraphContent_1,
      paragraphImg_1,
      paragraphTitle_2,
      paragraphContent_2,
      img_1,
      img_2,
      id,
    } = ctx.request.body;
    await app.model.Case.updateOne(
      {
        _id: app.__mongoose.Types.ObjectId(id),
      },
      {
        title,
        titlePic,
        subTitle,
        paragraphTitle_1,
        paragraphContent_1,
        paragraphImg_1,
        paragraphTitle_2,
        paragraphContent_2,
        img_1,
        img_2,
      }
    );
    ctx.success("更新成功");
  }

  async deleteCase() {
    const { app, ctx } = this;
    ctx.validate(
      {
        id: {
          type: "string",
        },
      },
      ctx.params
    );
    await app.model.Case.deleteOne({
      _id: app.__mongoose.Types.ObjectId(ctx.params.id),
    });
    ctx.success("删除成功");
  }
}

module.exports = CaseController;
