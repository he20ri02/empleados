//archivo principal
// Se llaman las dependecias instaladas
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')


//conexión con la base de datos

mongoose
//.connect('mongodb://127.0.0.1:27017/empleadosds01sv22')
.connect('mongodb+srv://heribertobr20:1234@ds01sv22.54iabcl.mongodb.net/empleadosds01sv22?retryWrites=true&w=majority')
.then( (x)=>{
    console.log(`Conectado exitosamente a la base de datos: "${x.connections[0].name}"`)
    //para concatenar se usa la comilla inclinada `
} )
.catch((err) => {
    console.log('error al conectarse con Mongo', err.reason)
} )

//configuración del servidor web

const empleadoRuta = require('./routes/empleado.route')
const exp = require('constants')
const { create } = require('domain')
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/empleados-mean')))
app.use('/',express.static(path.join(__dirname, 'dist/empleados-mean')))
app.use('/api',empleadoRuta)


///habilitar puerto
const port = process.env.PORT || 4000  // ||
const server = app.listen(port,() =>{
    console.log('conectado exitosamente al puerto '+port)
})

//manejador de error 404
app.use((req,res,next) =>{
    next(createError(404))
})


//manejador de errores general
app.use(function(err,req,res,next){
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})