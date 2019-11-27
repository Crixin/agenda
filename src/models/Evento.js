const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const EventoSchema = new mongoose.Schema({
    user_id: {type: Number, required: true},
    descricao: {type: String, required: true},
    workspace_id: {type: Number, required: true},
    dt_hr_inicial: {type: String, required: true},
    dt_hr_final: {type: String, required: true},
}, {
    timestamps: true,
});
autoIncrement.initialize(mongoose.connection);
EventoSchema.plugin(autoIncrement.plugin, 'Counter');
module.exports = mongoose.model('Evento', EventoSchema)
