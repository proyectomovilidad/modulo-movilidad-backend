const express = require('express')
const router = express.Router()
const controller = require("../controllers/ciudad.controller")
const controllerAut = require('../controllers/autenticacion.controller')


router.post('/getCiudades/', controller.getCiudades)
router.post('/', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.saveOrUpdateCiudad)
router.post('/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.saveOrUpdateCiudad)
router.delete ('/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.deleteCiudad)

module.exports = router 