const express = require('express');
const mongoose = require ('mongoose');
const server = express();
require('dotenv').config();



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


//Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGODB_CONNECT_URI)
.then(()=>{
    console.log('Conectado ao MongoDB!');
})
.catch((err)=>{
    console.log(err);
})

//Porta do servidor
const port = process.env.PORT

server.listen(port);

