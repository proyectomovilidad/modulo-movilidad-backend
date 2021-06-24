const express = require('express')
const router = express.Router()
const controller = require("../controllers/entornoMovilidad.controller")
const controllerAut = require('../controllers/autenticacion.controller')
//router.post('/saliente', controller.saveOrUpdateFechasMovSaliente)
//router.post('/:_id', controller.saveOrUpdateFechasMovSaliente)

// router.post('/', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.saveFechasMovilidad)
router.post('/', controller.saveFechasMovilidad)
// router.post('/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.updateFechasMovilidad)
router.post('/:_id', controller.updateFechasMovilidad)
router.post('/updateEntornoMov/:_id', controller.updateEntornoMov)
router.get('/getFechas', controller.getFechasMovilidad	)
router.get('/getEntornoMovilidadById/:_id', controller.getEntornoMovilidadById)
router.get('/getFechasByStatus/:periodo/:tipo', controller.getFechasByStatus)
router.delete('/eliminarEntorno/:_id', controller.eliminarEntorno)

module.exports = router 
