//Importa os pacotes
var express = require('express');
var todoController = require('./controllers/todo_controller');
var mongoose = require('mongoose');

var app = express();

//Especifica qual a template engine utilizada
app.set('view engine', 'ejs');

//Arquivos estáticos
app.use(express.static('./public'));


//Integra o controller
todoController(app);

//Configuração da porta
app.listen(3000);
console.log("Listening to port 3000");