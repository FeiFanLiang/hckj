/* eslint valid-jsdoc: "off" */

"use strict";

const path = require("path");
const fs = require('fs');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1599807210902_4670";
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.static = {
    dir:[
      {
        prefix:"/public",
        dir:path.join(appInfo.baseDir,'app/public')
      },
      {
        prefix:"/fileImgs",
        dir:path.join(appInfo.baseDir,'fileImgs')
      }
    ]
  }
  // add your middleware config here
  config.middleware = [];
  config.jwt = {
    secret: "hckjToken_ss1",
  };
  config.multipart = {
    fileSize: "1mb",
    mode: "stream",
    fileExtensions: [".png", ".jpg", ".jpeg", ".gif"],
  };
  config.view = {
    mapping: {
      ".ejs": "ejs",
    },
    defaultViewEngine: "ejs",
  };
  config.mongoose = {
    client: {
      options: {
        autoReconnect: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      url: "mongodb://127.0.0.1/hckj",
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    siteFile:{
      '/favicon.ico':fs.readFileSync('favicon.ico')
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
