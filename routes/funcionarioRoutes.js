const router = require('express').Router();
const Funcionario = require('../models/Funcionario');

//POST (INSERT) Inserindo um novo funcionario no MongoDB
router.post('/', (req, res) => {
    const {nome, cargo, salario, desligado} = req.body;
    if(!nome && !cargo && !salario && !desligado){
        res.status(422).json({ error: 'Informar o nome, cargo,salario e desligado é obrigatório!'});
        return
    }
    const funcionario ={
        nome,
        cargo,
        salario,
        desligado,
    };
    try{
        Funcionario.create(funcionario);
        res.status(201).json({message: "Funcionário cadastrado com sucesso"})
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find()
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error : error })
    }
    
});

router.get('/:id', async (req, res) => {
    //extrai o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const funcionario = await Funcionario.findOne({ _id: id})

        if(!funcionario){
            res.status(422).json({mensage: 'O usuário não foi encontrado!'})
            return
        }
        res.status(200).json(funcionario)
    } catch (error) {
        res.status(500).json({ error : error })
    }
})

// Update - atualização de dados (Update, patch)

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {nome, cargo, salario, desligado} = req.body

    const funcionario ={
        nome,
        cargo,
        salario,
        desligado,
    };

    try {
        
        const updatedFuncionario = await Funcionario.updateOne({_id: id}, funcionario)

        if(updatedFuncionario.matchedCount === 0){
            res.status(422).json({mensage: 'O usuário não foi encontrado!'})
        }

        res.status(200).json(funcionario)

    } catch (error) {
        res.status(500).json({ error : error })
    }
})

// Agora vamos deletar dados!

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const funcionario = await Funcionario.findOne({ _id: id})

    if(!funcionario){
        res.status(422).json({mensage: 'O usuário não foi encontrado!'})
        return
    }

    try {
        await Funcionario.deleteOne({_id: id})

        res.status(200).json({mensage: 'Usuário excluido com sucesso'})
    } catch (error) {
        res.status(500).json({ error : error })
    }
})

module.exports = router; 