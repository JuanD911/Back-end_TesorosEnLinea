require('dotenv').config();

const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

const Token = require('./token.model');

const auctionSchema = new Mongoose.Schema({
    nombre_producto: {
        type: String,
        required: [true, 'Ingrese el nombre del Producto']
    },
    foto_producto: {
        type: binData,
        required: [true, 'Ingrese un correo electrónico'],
    },
    descripcion_producto: {
        type: String,
        required: [true, 'Por favor ingrese una descripción del producto']
    },
    precio_inicial: {
        type: String,
        required: [true, 'Ingrese el precio inicial del producto']
    },
    monto_puja: {
        type: String,
        required: [true, 'Por favor ingrese el monto minimo para pujar en la subasta'],
    },
    tipo_subasta: {
        type: String,
        enum: ['privada', 'pública'],
        default: 'pública'
    },
    contraseña: {
        type: String,
        required: function() {
            return this.tipo_subasta === 'privada';
        }
    }
})

module.exports = Mongoose.model('Auction', auctionSchema);