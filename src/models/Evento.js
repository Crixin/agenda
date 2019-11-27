const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const EventoSchema = new mongoose.Schema({
    user_id: {type: Number, required: true},
    title: {type: String, required: true},
    //descricao: {type: String, required: false},
    workspace_id: {type: Number, required: true},
    dt_hr_inicial: {type: Date, required: true},
    dt_hr_final: {type: Date, required: true},
}, {
    timestamps: true,
});
autoIncrement.initialize(mongoose.connection);
EventoSchema.plugin(autoIncrement.plugin, 'Counter');
module.exports = mongoose.model('Evento', EventoSchema)
