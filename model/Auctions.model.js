require('dotenv').config();

const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;
const audit = require('../model/auditPlugin')
const Token = require('./token.model');
const auditPlugin = require('../model/auditPlugin');



const auctionSchema = new Mongoose.Schema({
    nombre_producto: {
        type: String,
        required: [true, 'Ingrese el nombre del Producto']
    },
    foto_producto: {
        type: String,
        required: [true, 'Ingrese una foto del producto'],
    },
    descripcion_producto: {
        type: String,
        required: [true, 'Por favor ingrese una descripción del producto']
    },
    precio_inicial: {
        type: Number,
        required: [true, 'Ingrese el precio inicial del producto']
    },
    precio_minimo: {
        type: Number,
        required: [true, 'Ingrese el precio minimo que recibiria']
    },
    monto_puja: {
        type: Number,
        required: [true, 'Por favor ingrese el monto minimo para pujar en la subasta'],
    },
    // tipo_subasta: {
    //     type: String,
    //     enum: ['privada', 'pública'],
    //     default: 'pública'
    // },
    // contraseña: {
    //     type: String,
    //     required: function() {
    //         return this.tipo_subasta === 'privada';
    //     }
    // }
})
auctionSchema.plugin(auditPlugin)
module.exports = Mongoose.model('Auction', auctionSchema);