

const jwt = require("jsonwebtoken");
//se crea la interfaz por como se escribe en Mongo el id


//si todo fucniona que continue next:NetxFunction
const validateJWT = (req,res,next) =>{
    //token se envia al header del token
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la peticion"
        })
    }

    try {
        //firma
        //le enviamos eltoken y verifica si esa llave secreta es la misma con la que se genero el token
        const {_id} = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req._id = _id;

        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:`Token inválido ${error}`
        })
    }
}

//VALIDAR TOKEN DE LA CONTRASEÑA
const validateJWTPass = (req, res, next) => {
    //vamos a leer un tokken que viene del request que viene en los headers
    const token = req.header("x-token-pass");

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        })
    }
    try {
        //busque el token que le envio y lo desencripta con llave secreta
        const {_id} = jwt.verify(token, process.env.JWT_SECRET_PASS)
        req._id = _id;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:`Token inválido ${error}`
        })
    }
}

module.exports = {validateJWTPass, validateJWT}
