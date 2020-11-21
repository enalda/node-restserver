//Recupera el archivo de configuracion
require('./config/config.js')

const express = require('express')
const app = express()

const bodyParser = require('body-parser');

//DEFINICION DE LOS MIDDLEWARE QUE PROCESARAN EL CONTENIDO EN CADA LLAMADA
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json());


//Peticiones GET para obtener datos
app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});

//Peticiones POST para guardar datos
//
//  Notas: Normalmente en peticiones POST mandaremos informacion
//         - Para manejar las variables vamos a usar Body-parser (npm body-parser)
//
//
//
app.post('/usuario', function(req, res) {
    let body = req.body; //La respuesta sera procesada por el Middleware

    //Puedo manejar los estados HTTP de respuesta con res.status(codigo)
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        }); //Si no hay nombre en los parametros, muestro un "bad request"
    } else {

        res.json({
            persona: body
        });
    }
});



//Peticiones PUT (y PATCH) para actualizar datos
//
// Notas: el :id es el nombre que le doy a la variable que va a contener el ID del usuario (puede llamarse de otra forma)
//        En req.params.id hago referencia al nombre de la variable definida en :id  
//
//        Para realizar la llamada podre hacer:   localhost:3000/usuario/kike8976563
//
app.put('/usuario/:id', function(req, res) {
    //Obtengo el valor de la variable :id
    let id_usuario = req.params.id;

    //Mando un objeto JSON:
    res.json({
        id: id_usuario
    });

});

//Peticiones DELETE para eliminar datos
app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});



//Escucha en el puerto que se haya definido en el archivo de configuracion
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto ', process.env.PORT);
});

//Ahora en POSTMAN haciendo un GET a localhost:3000 deberia devolver un hola mundo o lo que hayamos escrito.