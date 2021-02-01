const Controller = require('egg').Controller;
const { render } = require('../utils/utils.js');

class HomeController extends Controller {
  async indexPage() {
    const { ctx,app } = this;
    const casesList = await app.model.Case.find({}).select('_id title titlePic subTitle navTitle').sort({time:-1}).limit(5).lean({getters:true});
    const newsList = await app.model.News.find({indexShow:true}).select('_id title subTitle titlePic time').sort({time:-1}).limit(3).lean({getters:true});
    await render(ctx, 'homeIndex.ejs',{casesList,newsList,index:1} );
    // ctx.render('home.ejs', { title: '首页' });
  }
  async notFound(){
    const {ctx} = this;
    await render(ctx,'notFound.ejs');
  }
  async casePage(){
    const {ctx,app} = this;
    const {id} = ctx.params;
    if(!id || id.length < 24){
      await ctx.notFound();
      return
    }
    const caseDetail = await app.model.Case.findOne({
      _id:app.__mongoose.Types.ObjectId(id)
    }).lean(true);
    if(!caseDetail){
      await ctx.notFound();
      return
    }
    const casesList = await app.model.Case.find({}).select('_id title titlePic subTitle navTitle').sort({time:-1}).limit(5).lean({getters:true});
    await render(ctx,'case.ejs',{casesList,index:2,caseDetail});
  }
  async aboutPage(){
    const {ctx,app} = this;
    const casesList = await app.model.Case.find({}).select('_id title titlePic subTitle navTitle').sort({time:-1}).limit(5).lean({getters:true});
    await render(ctx,'aboutus.ejs',{casesList,index:6});
  }
  async newsPage(){
      const {ctx,app} = this;
      let {type=1,page=1} = ctx.request.query;
      const count = await app.model.News.paginate({type:type},{
        limit:10,
        page:1,
        lean:{getters:true},
        leanWidthId:true,
        select:'_id title titlePic time subTitle',
        sort:{
          time:-1
        }
    })
    if(page > count.totalPages){
      page = count.totalPages
    }
      let newsList = await app.model.News.paginate({type:type},{
        limit:10,
        page:page,
        lean:{getters:true},
        leanWidthId:true,
        select:'_id title titlePic time subTitle',
        sort:{
          time:-1
        }
    })
      const {totalPages,hasNextPage,hasPrevPage} = newsList;
      page = parseInt(page);
      let startPage = page;
      if(totalPages - page < 4){
        startPage = totalPages - 4 > 0 ? totalPages - 4 : 1
      }

      const pageArray = Array.from(new Array(totalPages - startPage > 5 ? 5 : totalPages - startPage+1)).map((el,index) => {
        return {
           href:`/news?type=${type}&page=${startPage+index}`,
           number:startPage+index,
           active:startPage+index  == page ? 'active' : ''
        }
      })
      const casesList = await app.model.Case.find({}).select('_id title titlePic subTitle navTitle').sort({time:-1}).limit(5).lean({getters:true});
      await render(ctx,'news.ejs',{casesList,newsList:newsList.docs,index:4,type,page,pageArray,hasNextPage,hasPrevPage,pagingCounter:totalPages})
  }
  async newsDetailPage(){
    const {ctx,app} = this;
    const {id} = ctx.params;
    if(!id || id.length < 24){
      await ctx.notFound();
      return
    }
    let last,next,page;
    const newsDetail = await app.model.News.findOne({
      _id:app.__mongoose.Types.ObjectId(id)
    }).lean({getters:true});
    if(newsDetail){
      last = await app.model.News.find({
        _id:{
          '$lt':newsDetail._id
        },
        type:newsDetail.type
      }).sort({_id:-1}).limit(1);
      last = last.length ? last[0] : null;
      next = await app.model.News.find({
        _id:{
          '$gt':newsDetail._id
        },
        type:newsDetail.type
      }).sort({_id:1}).limit(1)
      next = next.length ? next[0] : null;
      const currentPage = await app.model.News.count({type:newsDetail.type,_id:{
        '$gt':newsDetail._id
      }}).sort({_id:1});
      page = Math.floor((currentPage / 10)+1);
      const casesList = await app.model.Case.find({}).select('_id title titlePic subTitle navTitle').sort({time:-1}).limit(5).lean({getters:true});
      await render(ctx,'newsDetail.ejs',{casesList,index:4,newsDetail,last_id:last?last.id : null,next_id:next?next.id : null,page:page || 1})
    }else {
      await ctx.notFound();
    }
    
  }
  async serverPage(){
      const {ctx,app} = this;
      const casesList = await app.model.Case.find({}).select('_id title titlePic subTitle navTitle').sort({time:-1}).limit(5).lean({getters:true});
      await render(ctx,'server.ejs',{casesList,index:3})
  }
  async helpCenterPage(){
      const {ctx,app} = this;
      let {query='',page=1} = ctx.request.query;
      const reg = new RegExp(query, "i");
      const helpList = await app.model.Helps.paginate( {
        $or: [
          {
            title: { $regex: reg },
          },
          {
            content: { $regex: reg },
          },
        ],
      },{
        limit:10,
        page:page,
        lean:{getters:true},
        leanWidthId:true,
        select:'-__v -content',
        sort:{
          time:-1
        }
      });
      const {totalPages,hasNextPage,hasPrevPage} = helpList;
      page = parseInt(page);
      let startPage = page;
      if(totalPages - page < 4){
        startPage = totalPages - 4 > 0 ? totalPages - 4 : 1
      }

      const pageArray = Array.from(new Array(totalPages - startPage > 5 ? 5 : totalPages - startPage+1)).map((el,index) => {
        return {
           href:`/help?query=${query}&page=${startPage+index}`,
           number:startPage+index,
           active:startPage+index  == page ? 'active' : ''
        }
      })
      const casesList = await app.model.Case.find({}).select('_id title titlePic subTitle navTitle').sort({time:-1}).limit(5).lean({getters:true});
      await render(ctx,'helpcenter.ejs',{casesList,index:5,helpList:helpList.docs,hasNextPage,hasPrevPage,pageArray,query,pagingCounter:totalPages,page})
  }
  async helpDetailPage(){
    const {ctx,app} = this;
    const {id} = ctx.params;
    if(!id || id.length < 24){
      await ctx.notFound();
      return
    }
    const {query = ''} = ctx.query;
    const reg = new RegExp(query, "i");
    let last,next,page;
    const helpDetail = await app.model.Helps.findOne({
      _id:app.__mongoose.Types.ObjectId(id)
    }).lean({getters:true});
    if(helpDetail){
      last = await app.model.Helps.find({
        _id:{
          '$lt':helpDetail._id
        },
        $or: [
          {
            title: { $regex: reg },
          },
          {
            content: { $regex: reg },
          },
        ]
      }).sort({_id:-1}).limit(1);
      last = last.length ? last[0] : null;
      next = await app.model.Helps.find({
        _id:{
          '$gt':helpDetail._id
        },
        $or: [
          {
            title: { $regex: reg },
          },
          {
            content: { $regex: reg },
          },
        ]
      }).sort({_id:1}).limit(1)
      next = next.length ? next[0] : null;
      const currentPage = await app.model.Helps.count({ $or: [
        {
          title: { $regex: reg },
        },
        {
          content: { $regex: reg },
        },
      ],_id:{
        '$gt':helpDetail._id
      }}).sort({_id:1});
      page = Math.floor((currentPage / 10)+1);
      const casesList = await app.model.Case.find({}).select('_id title titlePic subTitle navTitle').sort({time:-1}).limit(5).lean({getters:true});
      await render(ctx,'helpDetail.ejs',{casesList,index:5,helpDetail,last_id:last?last.id : null,next_id:next?next.id : null,page,query})
    }else {
      await ctx.notFound();
    }
  }
}

module.exports = HomeController;
