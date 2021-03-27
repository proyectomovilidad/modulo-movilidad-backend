const express = require('express')
const router = express.Router()
const controller = require("../controllers/autenticacion.controller")


router.post('/iniciarSesion', controller.inicioSesion)



module.exports = router 