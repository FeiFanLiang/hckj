import axios from 'axios';
import $ from 'jquery';
import './common.js';
// styles
import '../less/news.less';



if (process.env.NODE_ENV === 'development') {
  // 在开发环境下，使用 raw-loader 引入 ejs 模板文件，强制 webpack 将其视为需要热更新的一部分 bundle
  require('raw-loader!../view/newsDetail.ejs');
  if (module.hot) {
    module.hot.accept();
    /**
     * 监听 hot module 完成事件，重新从服务端获取模板，替换掉原来的 document
     * 这种热更新方式需要注意：
     * 1. 如果你在元素上之前绑定了事件，那么热更新之后，这些事件可能会失效
     * 2. 如果事件在模块卸载之前未销毁，可能会导致内存泄漏
     * 上述两个问题的解决方式，可以在 document.body 内容替换之前，将事件手动解绑。
     */
    module.hot.dispose(() => {
      const href = window.location.href;
      axios.get(href).then(res => {
        document.body.innerHTML = res.data;
      }).catch(e => {
        console.error(e);
      });
    });
  }
}
$(document).ready(function(){
  if(last_id){
    $('#news_pre').attr('href',`/news/${last_id}`)
  }else {
    $('#news_pre').css('visibility','hidden')
  }
  if(next_id){
    $('#news_next').attr('href',`/news/${next_id}`)
  }else {
    $('#news_next').css('visibility','hidden')
  }
})


