const express = require('express')
const router = express.Router()
const controller = require("../controllers/AspUisAcademic.controller")
const controllerAutc = require("../controllers/autenticacion.controller")


router.get('/getAspUisAcademicByCodigo/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getAspUisAcademicByCodigo)
router.get('/getAspUisAcademicById/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getAspUisAcademicById)
router.get('/getAspUisAcademicByAnoInscripcion/', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getAspUisAcademicByAnoInscripcion)
router.get('/getAspUisAcademicByPeriodoAcademicoId/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getAspUisAcademicByPeriodoAcademico)
router.get('/getAspiranteUisAcademicByProgramaAcademicId/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getAspUisAcademicByProgramaAcademico)
router.get('/getAspiranteUisAcademic/',  controller.getAspUisAcademic)
router.delete('/deleteAspiranteUisAcademic/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.deleteAspUisAcademic) 
router.post('/', controller.saveOrUpdateAspUisAcademic)
router.post('/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.saveOrUpdateAspUisAcademic)

module.exports = router