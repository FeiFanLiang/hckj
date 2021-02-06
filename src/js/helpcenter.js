import axios from "axios";
import $ from "jquery";
import './common.js';
import 'babel-polyfill';
// styles
import "../less/helpcenter.less";

if (process.env.NODE_ENV === "development") {
  // 在开发环境下，使用 raw-loader 引入 ejs 模板文件，强制 webpack 将其视为需要热更新的一部分 bundle
  require("raw-loader!../view/helpcenter.ejs");
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
      axios
        .get(href)
        .then((res) => {
          document.body.innerHTML = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    });
  }
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function getPage(helpList, page = 1, query) {
  const { totalPages, hasNextPage, hasPrevPage } = helpList;
  page = parseInt(page);
  let startPage = page;
  if (totalPages - page < 4) {
    startPage = totalPages - 4 > 0 ? totalPages - 4 : 1;
  }

  const pageArray = Array.from(
    new Array(totalPages - startPage > 5 ? 5 : totalPages - startPage + 1)
  ).map((el, index) => {
    return {
      href: `/help?query=${query}&page=${startPage + index}`,
      number: startPage + index,
      active: startPage + index == page ? "active" : "",
    };
  });
  let pgHtml = "";
  if (hasPrevPage) {
    pgHtml = `<a href="/help?query=${query}&page=${page - 1}">
        <
    </a>`;
  }
  pgHtml = pageArray.reduce((total, current) => {
    total += `<a href="${current.href}" class="${current.active}">${current.number}</a>`;
    return total;
  }, pgHtml);
  if (hasNextPage) {
    pgHtml =
      pgHtml +
      `<a href="/help?query=${query}&page=${page + 1}">
        >
    </a>
    <a class="last-p" href="/help?query=${query}&page=${totalPages}">
        尾页
    </a>`;
  }
  pgHtml =
    pgHtml +
    `<span class="input">
      <input type="text" id="helpInput">
  </span>
  <a id="helpGo">
      GO
  </a>`;
  $(".pagination").empty();
  $(".pagination").append(pgHtml);
}

function setUrl(query, page) {
  var url = location.pathname + `?page=${page}&query=${query}`;
  history.pushState({ url: url, title: document.title }, document.title, url);
}
$(document).ready(function(){
  $("#helpGo").on("click", function (e) {
    e.preventDefault();
    var value = $("#helpInput").val();
    if (value && value > 0) {
      let query = getQueryVariable("query");
      document.location.href = "/help?query=" + query + "&page=" + value;
    }
  });
  $("#search_btn").on("click", function (e) {
    e.preventDefault();
    let value = $("#search").val();
    $.ajax({
      url: "/api/searchHelp",
      dataType: "json",
      data: {
        query: value,
      },
      success: (res) => {
        if (res.code && res.code === 200) {
          if (res.data.docs.length === 0) {
            $(".no-msg").fadeIn(300);
            setTimeout(() => {
              $(".no-msg").fadeOut(300);
            }, 2000);
          } else {
            var list = res.data.docs.reduce((total, current) => {
              total += `<li>
                <a href="/help/${current._id}">
                    <div class="list-item">
                        <span class="overflowOne">${current.title}</span>
                        <span class="time">
                            ${current.time}
                        </span>
                    </div>
                </a>
            </li>`;
              return total;
            }, "");
            $(".help-list").empty();
            $(".help-list").append(list);
            setUrl(value, res.data.page);
            getPage(res.data, res.data.page, value);
          }
        }
      },
    });
  });
})

