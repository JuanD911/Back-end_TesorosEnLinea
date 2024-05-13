var express = require('express');
var router = express.Router();
const User = require('../model/Users.model');
const { jsonResponse } = require('../lib/jsonResponse');
const createError = require('http-errors');

router.get('/', async function (req, res, next) {
  let results = {};

  try {
    results = await User.find({});
  } catch (ex) {
    console.log(ex);
  }

  res.json(results);
});

router.post('/', async function (req, res, next) {
  const { name, email, telefono, pais, clave } = req.body;

  if (!name || !email || !telefono || !pais || !clave) {
    next(createError(400, 'No se han ingresado todos los datos'));
  }else if(name && email && telefono && pais && clave){
    const user = new User({name, email, telefono, pais, clave});
    const exists = await user.emailExists(email);

    if(exists){
      next(createError(400, 'Ya existe un usuario con ese correo electrónico, Pruebe con otro'));
    }else{
      await user.save();
      res.json(jsonResponse(200, {
        message: 'Usuario creado correctamente'
      }));
    }
  }
});

module.exports = router;
