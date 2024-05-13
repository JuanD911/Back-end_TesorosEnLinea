//Clase para crear las respuestas a errores 

module.exports.jsonResponse = function(statuscode, body){
    return{
        statuscode,
        body
    };
};