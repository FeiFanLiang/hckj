/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599807210902_4670';
  config.security =  {
    csrf: {
      enable: false,
    }
 }
  // add your middleware config here
  config.middleware = [];

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
    defaultViewEngine: 'ejs',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
