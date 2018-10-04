const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

const userSchema = mongoose.Schema({
    local: {
        username: { type: String, unique: true, require: true },
        password: { type: String, require: true },
        country: { type: String, require: true },
        role: { type: String, default: 'USER_ROLE', enum: rolesValidos }
    },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;