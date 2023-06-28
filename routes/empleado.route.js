const express = require('express')
const app = express()
const empleadoRuta = express.Router()

//declaramos un objeto del modelo 

let Empleado = require('../models/Empleado')


//metodo para agregar un nuevo empleado
empleadoRuta.route('/create').post((req,res) => {
    Empleado.create(req.body)
    .then((data) => {
        console.log('Se insertó el documento')
        res.send(data)
    })
    .catch((err) =>{
        console.error(err)
    })
})

//metodo para obtener todos los empleados que hay en la coleccion

empleadoRuta.route('/empleados').get((req,res)=>{
    Empleado.find()
    .then ((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.error(err)
    })

})

//Obtener un solo empleado por su id
empleadoRuta.route('/empleado/:id').get((req,res) => {
    Empleado.findById(req.params.id)
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.error(err)
    })
})

//Actualizar  en empleado/////////////////////////////////////
empleadoRuta.route('/update/:id').put((req,res) =>{
    Empleado.findByIdAndUpdate(req.params.id,{
        $set: req.body
    })
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.error(err)
    })
})


//Eliminar empleado/////////////////////////////7
empleadoRuta.route('/delete/:id').delete((req,res) => {
    Empleado.findByIdAndRemove(req.params.id)
    .then((data) => {
        console.log('se eliminó el documento')
        res.send(data)
    })
    .catch((err) => {
        console.error(err)
    })
})


module.exports = empleadoRuta;