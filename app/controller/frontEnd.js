const Controller = require('egg').Controller;
const { render } = require('../utils/utils.js');

class HomeController extends Controller {
  async indexPage() {
    const { ctx } = this;
    await render(ctx, 'homeIndex.ejs', { title: '首页' });
    // ctx.render('home.ejs', { title: '首页' });
  }
  async casePage(){
    const {ctx} = this;
    await render(ctx,'case.ejs',{});
  }
  async aboutPage(){
    const {ctx} = this;
    await render(ctx,'aboutus.ejs',{});
  }
  async newsPage(){
      const {ctx} = this;
      await render(ctx,'news.ejs',{})
  }
  async newsDetailPage(){
    const {ctx} = this;
    await render(ctx,'newsDetail.ejs',{})
  }
  async serverPage(){
      const {ctx} = this;
      await render(ctx,'server.ejs',{})
  }
  async helpCenterPage(){
      const {ctx} = this;
      await render(ctx,'helpcenter.ejs',{})
  }
  async helpDetailPage(){
    const {ctx} = this;
    await render(ctx,'helpDetail.ejs',{})
  }
}

module.exports = HomeController;
