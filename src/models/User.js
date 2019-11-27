const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {
    timestamps: true,
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

UserSchema.pre('update', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});
autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, 'Counter');
module.exports = mongoose.model('User', UserSchema)
