const express = require('express')
const router = express.Router()
const controller = require("../controllers/profesores.controller")
const controllerAutenticacion = require("../controllers/autenticacion.controller")



router.get('/getProfesores',controller.getProfesores)
router.get('/getProfesoresById/:_id', controller.getProfesoresById)
router.get('/getProfesoresByDocumentoId/:_id',controller.getProfesoresByDocumentoId)
router.delete('/deleteProfesor/:_id',controller.deleteProfesor) 
router.get('/getProfesoresConsulta',  controller.getProfesoresConsulta)
router.post('/consultarProfesores', controller.consultarProfesores)
router.post('/', controller.saveOrUpdateProfesores)
router.put('/:_id',   controller.saveOrUpdateProfesores)

//controllerAutenticacion.validacionUsuario, controllerAutenticacion.controlRutas,
module.exports = router