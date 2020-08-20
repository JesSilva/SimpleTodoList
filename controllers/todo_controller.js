//Importado os packages necessários
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Conectando à base de dados.
const dbURI = 'mongodbkey'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

//Criando um Schema
const todoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
}, { timestamps: true});

//Cria o Model baseado no schema, passando as informações que serão utilizadas a cada
//operação
const Todo = mongoose.model('todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    
    //Gerencia as requisições para a obtenção de dados
    app.get('/todo', function(req, res){
    
        //Busca os registros do banco e os coloca na view
        Todo.find({}, function(err, data){
            
            if(err) throw err;

            res.render('todo', {todos: data});
        });
        
    });

    //Gerencia as requisições para o envio de dados
    app.post('/todo', urlencodedParser, function(req, res){

        //Obtém os dados da view e os passa ao model, realizando a operação no banco
        var newTodo = Todo(req.body).save(function(err, data){
        
            if(err) throw err;
            res.json({ todos: data});
        
        });
        
    });

    //Gerencia as requisições para a exclusão de dados
    app.delete('/todo/:item', function(req, res){

        //Filtra se o dado recebido existe no array de dados, caso exista, o remove
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;

            res.json({ todos: data});
        });
    });
}
