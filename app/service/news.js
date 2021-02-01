const {Service} = require('egg');

class NewsService extends Service {
    async getNewsList(pageSize,currentPage){
        const {app} = this;
        const list = await app.model.News.paginate({},{
            limit:pageSize,
            page:currentPage,
            lean:{getters:true},
            leanWidthId:true,
            select:'-__v',
            sort:{
              time:-1
            }
          })
        return list
    }

    async getIndexNews(){
        const {app} = this;
        const list = await app.model.News.find({}).sort({time:-1}).limit(3).select('_id title subTitle type titlePic time').lean(true);
        return list
    }
}

module.exports = NewsService;