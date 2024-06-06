const jwt = require("jsonwebtoken");

const generateJWT = (
  _id,
  email="",
  expiresIn = "12h",
  jwtSecret = process.env.ACCESS_TOKEN_SECRET
) => {

    return new Promise((resolve,reject)=>{
        const payload = {
            _id,
            email,
        };
        jwt.sign(payload, jwtSecret,{
            expiresIn: expiresIn,
        },
        (error, token)=>{
            if(error){
                console.log(error)
                reject("No se puede generar el token")
            }
            else resolve(token)
        }
    )
        console.log(payload);
        
    })

};

module.exports = generateJWT;