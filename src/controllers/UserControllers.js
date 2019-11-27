const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {

    async index(req, res){

        const {id} = req.params;

        const user = await User.findOne({_id: id});

        return res.json(user);
    },

    async create(req, res){
        const {name, email, password} = req.body;

    
            if (await User.findOne({email: email }))
                return res.status(200).send({error: 'Usuário já existe'})
    
            const user = await User.create({
                name,
                email,
                password,
            }).catch( err =>{
                return res.status(200).send({error: err})
            });
    
            return res.send({user});
     
    },
    async login(req, res){
        try {
            const {email, password} = req.body;
            var user = await User.findOne({ email: email }).exec();
            if(!user) {
                return res.status(200).send({ error: "Usuário e/ou senha inválidos" });
            }
            if(!bcrypt.compareSync(password, user.password)) {
                return res.status(200).send({ error: "Usuário e/ou senha inválidos" });
            }
            res.send({user});
        } catch (error) {
            res.status(500).send(error);
        }
     
    },
    async update(req, res){
        const {id, name, email, password} = req.body;
        if (await User.findOne({_id: id })){
            const hash = await bcrypt.hash(password, 10);

            const user = await User.updateOne({_id: id}, { 
                $set: {
                    name,
                    email,
                    password: hash,
                }
            }).catch( err =>{
                return res.status(200).send({error: "Falha ao atualizar o usuário"})
            });
            return res.send({user});
        }
        return res.status(200).send({error: 'Usuário não existe'})
    }
};
