var express = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
var router = express.Router();
const Auction = require('../model/Auctions.model')
const createError = require('http-errors');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', async function (req, res, next) {
  let results = {};

  try {
    results = await Auction.find({});
  } catch (ex) {
    console.log(ex);
  }

  res.json(results);
});

router.post('/', async function (req, res, next) {
  const { nombre_producto, foto_producto, descripcion_producto, precio_inicial, precio_minimo, monto_puja/*, tipo_subasta, contraseña*/} = req.body;

if (!nombre_producto || !foto_producto || !descripcion_producto || !precio_inicial || !precio_minimo ||!monto_puja/* || !tipo_subasta || !contraseña*/) {
    next(createError(400, 'No se han ingresado todos los datos'));
  }else if(nombre_producto && foto_producto && descripcion_producto && precio_inicial && precio_minimo && monto_puja/* && tipo_subasta && contraseña*/){
    const auction = new Auction({nombre_producto, foto_producto, descripcion_producto, precio_inicial, precio_minimo, monto_puja/*, tipo_subasta, contraseña*/});
    validateJWT
    try{
      await auction.save();

      res.json(jsonResponse(200, {
        message: 'Subasta creada de manera existiosa'
      }))
    }catch(ex){
      console.log(ex);
      next(createError(500, 'Error creando la subasta'))
    }
  }
});

router.get('/:id', async function (req, res, next) {
  const auctionId = req.params.id;

  try {
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return next(createError(404, 'Subasta no encontrada'));
    }
    res.json(auction);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Error al obtener la subasta'));
  }
});

router.delete('/:id', async function (req, res, next) {
  const auctionId = req.params.id;

  try {
    await Auction.findByIdAndDelete(auctionId);
    res.json(jsonResponse(200, { message: 'Subasta eliminada correctamente' }));
  } catch (error) {
    console.log(error);
    next(createError(500, 'Error al eliminar subasta'));
  }
});

module.exports = router;
