'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt()
  router.get('/',controller.frontEnd.indexPage);
  router.get('/case/:id',controller.frontEnd.casePage);
  router.get('/news',controller.frontEnd.newsPage);
  router.get('/news/:id',controller.frontEnd.newsDetailPage)
  router.get('/server',controller.frontEnd.serverPage);
  router.get('/help',controller.frontEnd.helpCenterPage);
  router.get('/help/:id',controller.frontEnd.helpDetailPage)
  router.get('/about',controller.frontEnd.aboutPage);

  router.post('/api/upload',jwt,controller.file.upload);
  router.post('/api/login',controller.admin.login);
  router.post('/api/updatePassword',jwt,controller.admin.updatePassword)


  router.post('/api/updateFile',jwt,controller.file.updateFile)
  router.post('/api/getFileList',jwt,controller.file.getFileList)
  router.delete('/api/deleteFile/:id',jwt,controller.file.deleteFile)
  router.get('/api/allFile',jwt,controller.file.getAllFile)

  router.post('/api/getNewList',jwt,controller.news.index);
  router.post('/api/updateNew',jwt,controller.news.updateNew);
  router.delete('/api/deleteNew/:id',jwt,controller.news.deleteNew);

  router.post('/api/getCaseList',jwt,controller.case.index);
  router.post('/api/updateCase',jwt,controller.case.updateCase);
  router.delete('/api/deleteCase/:id',jwt,controller.case.deleteCase);

  router.post('/api/getHelpList',jwt,controller.help.index);
  router.post('/api/updateHelp',jwt,controller.help.updateHelp);
  router.delete('/api/deleteHelp/:id',jwt,controller.help.deleteHelp);
  router.get('/api/searchHelp',controller.help.queryList)
  //router.get('*',controller.frontEnd.notFound);
};
