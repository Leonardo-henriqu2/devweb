const express = require('express');
const mongoose = require ('mongoose');
const server = express();


const funcionarioRoutes = require('./routes/funcionarioRoutes');

// Middleware
server.use(
    express.urlencoded({
        extended: true,
    }),
);

server.use(express.json());

//Criando o endpoint e routas da minha API
server.use('/funcionario', funcionarioRoutes);



//Conexão com MongoDB Atlas
const DB_USER = 'bernardesleonardosouza';
const DB_PASSWORD = encodeURIComponent('L21y74dGaO7gnROp');

//Conexão com MongoDB Atlas
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mapxb30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log('Conectado ao MongoDB!');
})
.catch((err)=>{
    console.log(err);
})

//Porta do servidor
server.listen(3000);

/*const cursos = ['PHP', 'Java', 'Node', 'Python'];

server.use((req, res, next) => {
    console.log(`URL CHAMADA: ${req.url}`);

    return next();
});
function checkCurso(req, res, next){
    if(!req.body.novo_curso){
        return res.status(400).json({erro:
            "O RequestBody do método POST está vazio ou fora do formato esperado. Para criar um novo curso você precisa seguir esse exemplo: {'novo_curso': 'C#'}"});
    }

    return next();
};
function checkIDCurso(req, res , next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({ erro : "O curso não existe no ID solicitado" });
    }
    return next();    
};
function verificaReqBody(req, res, next){
    if(!req.body.curso){
        return res.status(400).json({erro:
            "O RequestBody está vazio ou fora do formato esperado. Para atualizar o curso corretamente, além de informar o ID do mesmo no endpoint da url. Você precisa seguir esse formato {'curso':'nome_do_curso_atualizado'}"
        });
    }
    return next();
};

function checkDelete(req, res, next){
    if(!req.params){
        return res.status(400).json({erro:
        "Deu erro porque não foi passado o id do curso a ser deletado como parametro na url"
        });
    }
    return next();
};

server.get('/curso', (req, res) => {
    return res.json(cursos);
});

server.get('/curso/:index', checkIDCurso, (req,res) => {

    const { index } = req.params;

    return res.json(cursos[index]);    
});

server.post('/curso', checkCurso,(req, res) => {
    const { novo_curso } = req.body;
    cursos.push(novo_curso);
    return res.json(cursos);
}
);
server.use((req, res, next) => {
    if(req.method === 'POST'){
        console.log(`Lista de cursos atualizados:  ${res.json(cursos)}`);    
    }
    return next();
});

server.put('/curso/:index', checkIDCurso,verificaReqBody, (req, res) => {

    const { index } = req.params;
    const { curso } = req.body;
    
    cursos[index] = curso;

    return res.json(curso);

});

server.delete('/curso/:idex', checkDelete,(req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1)
    return res.json({message: "Deu erro porque não foi passado o id do curso a ser deletado como parametro na url"});
});
server.use((req, res, next) => {
    if(req.method === 'DELETE'){
        console.log(`Lista de cursos atualizados:  ${cursos}`);    
    }
    return next();
});

server.listen(3000);
*/