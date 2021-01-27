const Controller = require('egg').Controller;
const { render } = require('../utils/utils.js');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await render(ctx, 'home.ejs', { title: '首页' });
    // ctx.render('home.ejs', { title: '首页' });
  }
  async testIndex(){
    const {ctx} = this;
    await render(ctx,'index.ejs',{});
  }
  async testCase(){
    const {ctx} = this;
    await render(ctx,'case.ejs',{});
  }
}

module.exports = HomeController;
