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
        lean: {
          getters:true
        },
        leanWidthId: true,
        select: "-__v",
        sort: {
          time: -1,
        },
      }
    );
    ctx.success("查询成功", list);
  }

 
  async updateCase() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: "string",
        allowEmpty:true
      },
      title: {
        type: "string",
        max:20
      },
      indexShow:{
        type:"boolean"
      },
      titlePic: {
        type: "string",
      },
      navTitle:{
        type:"string",
        max:10
      },
      subTitle: {
        type: "string"
      },
      indexIcon:{
        type:'string'
      },
      paragraphTitle_1: {
        type: "string",
        max:100
      },
      paragraphContent_1: {
        type: "string",
        allowEmpty:true
      },
      paragraphImg_1: {
        type: "string",
      },
      paragraphTitle_2: {
        type: "string",
      },
      paragraphContent_2: {
        type: "string",
        allowEmpty:true,
        max:500
      },
      img_1: {
        type: "string"
      },
      img_2: {
        type: "array",
        min: 1,
      },
      paragraphContent2Img_1:{
        type:"string"
      },
      paragraphContent2ImgTitle_1:{
        type:'string',
        max:50
      },
      paragraphContent2Img_2:{
        type:'string'
      },
      paragraphContent2ImgTitle_2:{
        type:"string",
        max:50
      },
      paragraphContent2Img_3:{
        type:'string'
      },
      paragraphContent2ImgTitle_3:{
        type:"string",
        max:50
      }
    });
    const {
      title,
      titlePic,
      subTitle,
      navTitle,
      indexShow,
      paragraphTitle_1,
      paragraphContent_1,
      paragraphImg_1,
      paragraphTitle_2,
      paragraphContent_2,
      paragraphContent2Img_1,
      paragraphContent2ImgTitle_3,
      paragraphContent2Img_3,
      paragraphContent2ImgTitle_2,
      paragraphContent2Img_2,
      paragraphContent2ImgTitle_1,
      img_1,
      img_2,
      indexIcon,
      id,
    } = ctx.request.body;
    if(id){
      await app.model.Case.updateOne(
        {
          _id: app.__mongoose.Types.ObjectId(id),
        },
        {
          title,
          titlePic,
          navTitle,
          indexShow,
          subTitle,
          paragraphTitle_1,
          paragraphContent_1,
          paragraphImg_1,
          paragraphTitle_2,
          paragraphContent_2,
          paragraphContent2Img_1,
          paragraphContent2ImgTitle_3,
          paragraphContent2Img_3,
          paragraphContent2ImgTitle_2,
          paragraphContent2Img_2,
          paragraphContent2ImgTitle_1,
          img_1,
          img_2,
          indexIcon
        }
      );
      ctx.success("更新成功");
    }else {
      const newCase = app.model.Case({
        title,
        titlePic,
        subTitle,
        navTitle,
        indexShow,
        paragraphTitle_1,
        paragraphContent_1,
        paragraphImg_1,
        paragraphTitle_2,
        paragraphContent_2,
        img_1,
        img_2,
        indexIcon,
        paragraphContent2Img_1,
        paragraphContent2ImgTitle_3,
        paragraphContent2ImgTitle_2,
        paragraphContent2Img_2,
        paragraphContent2ImgTitle_1
      });
      await newCase.save();
      ctx.success("添加成功", {
        id: newCase.id,
        title,
        titlePic,
        navTitle,
        indexShow,
        subTitle,
        paragraphTitle_1,
        paragraphContent_1,
        paragraphImg_1,
        paragraphContent2ImgTitle_3,
        paragraphContent2ImgTitle_2,
        paragraphContent2Img_2,
        paragraphContent2Img_1,
        paragraphContent2ImgTitle_1,
        paragraphTitle_2,
        paragraphContent_2,
        img_1,
        img_2,
        indexIcon
      });
    }
    
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
