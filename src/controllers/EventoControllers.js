const Evento = require('../models/Evento');
const User = require('../models/User');

module.exports = {

    async index(req, res){
        const {workspace_id} = req.params;
        
        const eventos = await ((workspace_id) ? Evento.find({"workspace_id": workspace_id} ) : Evento.find())

        return res.json(eventos);
    },

    async create(req, res){
        const {user_id, descricao, workspace_id, dt_hr_inicial, dt_hr_final} = req.body;

        if (await User.findOne({_id: user_id })){

            const evento = await Evento.create({
                user_id,
                descricao,
                workspace_id,
                dt_hr_inicial,
                dt_hr_final,
            }).catch( err =>{
                return res.status(400).send({error: err})
            });
            
            return res.send({evento});
        }else{
            return res.status(400).send({error: 'Usuário não existe'})
        }
    },

    async update(req, res){
        const {id, descricao, dt_hr_inicial, dt_hr_final} = req.body;

        if (await Evento.findOne({_id: id })){

            const evento = await Evento.updateOne({_id: id}, { 
                $set: {
                    descricao,
                    dt_hr_inicial,
                    dt_hr_final,
                }
            }).catch( err =>{
                return res.status(400).send({error: err})
            });
            
            return res.send({evento});
        }else{
            return res.status(400).send({error: 'Evento não existe'})
        }
    }
};
