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

// GET user by ID
router.get('/:id', async function (req, res, next) {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, 'Usuario no encontrado'));
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Error al obtener usuario'));
  }
});

// DELETE a user by ID
router.delete('/:id', async function (req, res, next) {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.json(jsonResponse(200, { message: 'Usuario eliminado correctamente' }));
  } catch (error) {
    console.log(error);
    next(createError(500, 'Error al eliminar usuario'));
  }
});



module.exports = router;