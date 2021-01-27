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
  

  router.post('/api/upload',controller.file.upload);
  router.post('/api/login',controller.admin.login);
  router.post('/api/updatePassword',controller.admin.updatePassword)
  router.post('/api/addFile',controller.file.addFile)
  router.post('/api/getFileList',controller.file.getFileList)
  router.delete('/api/deleteFile/:id',controller.file.deleteFile)

  router.post('/api/addNew',controller.news.addNew);
  router.post('/api/getNewList',controller.news.index);
  router.post('/api/updateNew',controller.news.updateNew);
  router.delete('/api/deleteNew/:id',controller.news.deleteNew);

  router.post('/api/addCase',controller.case.addCase);
  router.post('/api/getCaseList',controller.case.index);
  router.post('/api/updateCase',controller.case.updateCase);
  router.delete('/api/deleteCase/:id',controller.case.deleteCase);

  router.post('/api/addHelp',controller.help.addHelp);
  router.post('/api/getHelpList',controller.help.index);
  router.post('/api/updateHelp',controller.help.updateHelp);
  router.delete('/api/deleteHelp/:id',controller.help.deleteHelp);
  //test
  router.post('/api/search',controller.help.queryList);
  
};
