require('dotenv').config();

const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const validate = require('mongoose-validator')
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

const Token = require('./token.model');

const userSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingrese el nombre del Usuario']
    },
    email: {
        type: String,
        required: [true, 'Ingrese un correo electrónico'],
        unique: true,
        lowercase: true,
        //validate: [isEmail, 'Por favor ingrese un correo electrónico válido']
    },
    telefono: {
        type: String,
        required: [true, 'Por favor ingrese su número de contacto']
    },
    pais: {
        type: String,
        required: [true, 'Ingrese el pais de residencia']
    },
    clave: {
        type: String,
        required: [true, 'Por favor ingrese una constraseña válida'],
        minlenght: [6, 'La contraseña debe tener al menos 6 caracteres']
    }
})

//encriptacion de la contraseña
userSchema.pre('save', function(next){
    if(this.isModified('clave') || this.isNew){
        const document = this;

        bcrypt.hash(document.clave, 10, function(err, hash){
            if(err){
                next(err);
            }else{
                document.clave = hash;
                next();
            }
        });
    }else{
        next();
    }
});

//agregar validacion de email

//verificar que el email sea único
userSchema.methods.emailExists = async function(email){
    try{
        let result = await Mongoose.model('email').find({email: email});
        return result.length > 0;
    }catch(ex){
        return false;
    }
   
};

//verificar que clave sea correcta
userSchema.methods.isCorrectPassword = async function(clave, hash){
    try{
        const same = await bcrypt.compare(clave, hash);
        return same;
    }catch(ex){
        return false;
    }
};

//Crear tokens para los incios de sesion de los usuarios
//pide cada cierto tiempo que se vuelve a ingresar, para asi verficar que el usuario se el correcto
userSchema.methods.createAccessToken = function(){
    const{id, name} = this;
    const accessToken = jwt.sign(
        {user: {id, name}},
        ACCESS_TOKEN_SECRET,
        {expiresIn: '1d'}
    );
    return accessToken;
}

userSchema.methods.creatRefreshToken = async function(){
    const{id, name} = this;
    const refreshToken = jwt.sign(
        {user: {id, name}},
        REFRESH_TOKEN_SECRET,
        {expiresIn: '20d'}
    );

    try{
        await new Token({token: refreshToken}).save();
        return refreshToken;
    }catch(ex){
        next(new Error('Error creando refresh token'));
    }
}

module.exports = Mongoose.model('User', userSchema);