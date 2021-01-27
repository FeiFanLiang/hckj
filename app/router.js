'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/welcome', controller.welcome.index);
  router.get('/index',controller.frontEnd.indexPage);
  router.get('/case',controller.frontEnd.casePage);
  router.get('/news',controller.frontEnd.newsPage);
  router.get('/news/:id',controller.frontEnd.newsDetailPage)
  router.get('/server',controller.frontEnd.serverPage);
  router.get('/help',controller.frontEnd.helpCenterPage);
  router.get('/help/:id',controller.frontEnd.helpDetailPage)
  router.get('/about',controller.frontEnd.aboutPage);
  

  router.post('/api/upload',controller.file.upload)
};
