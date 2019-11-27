const Workspace = require('../models/Workspace');

module.exports = {

    async index(req, res){
        const {id} = req.body;
        
        const workspaces = await ((id) ? Workspace.find({"_id": id} ) : Workspace.find())

        return res.json(workspaces);
    },

    async create(req, res){
        const {name} = req.body;

        if (await Workspace.findOne({name: name }))
            return res.status(200).send({error: 'Workspace já existe'})

        const workspace = await Workspace.create({
            name,
        }).catch( err =>{
            return res.status(200).send({error: err})
        });

        return res.send({workspace});
    },

    async login(req, res){
        const {name} = req.body;

        const workspace = await Workspace.findOne({name: name })

        if (await Workspace.findOne({name: name }))
            return res.send({workspace});

        return res.status(200).send({error: 'Workspace não existe!'})
    }
};
