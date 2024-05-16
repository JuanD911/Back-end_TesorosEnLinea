
const bcrypt = require('bcrypt');
var express = require("express");
const User = require("../model/Users.model");
var router = express.Router();

/* GET users listing. */

router.post("/", async function (req, res, next) {
  const { email, clave } = req.body;
  console.log("pass--> ", clave)
  try {
    const usuario = await User.findOne({ email: email });
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son válidas",
      });
    }
    console.log("usuairo ..>",usuario.clave)
    const validarPassword = bcrypt.compareSync(clave, usuario.clave);

    if (!validarPassword) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son válidas",
      });
    }

    //generar Token

   

    res.status(200).json({
      ok: true,
    });
  } catch (ex) {
    console.log(ex);
    res.status(400).json({
      ok: false,
      error,
      msg: "Hable con el administrador",
    });
  }

  
});

module.exports = router;
