const express = require('express');

const routes = new express.Router();

const UserController = require('./controllers/UserControllers');
const WorkspaceController = require('./controllers/WorkspaceControllers');
const EventoController = require('./controllers/EventoControllers');

//User
routes.get('/user/:id', UserController.index);
routes.post('/user/register', UserController.create);
routes.post('/user/login', UserController.login);
routes.post('/user/update', UserController.update);

//Workspace
routes.get('/workspace', WorkspaceController.index);
routes.post('/workspace/create', WorkspaceController.create);
routes.post('/workspace/login', WorkspaceController.login);


//Evento
routes.get('/evento', EventoController.index);
routes.post('/evento/create', EventoController.create);
routes.post('/evento/update', EventoController.update);




module.exports = routes;
