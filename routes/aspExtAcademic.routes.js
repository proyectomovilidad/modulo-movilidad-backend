const express = require('express')
const router = express.Router()
const controller = require("../controllers/AspExtAcademic.controller")
const controllerAut = require('../controllers/autenticacion.controller')

router.get('/getAspiranteExtAcademic/', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.getAspExtAcademic)
router.get('/getAspExtAcademicById/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.getAspExtAcademicById)
router.get('/getAspExtAcademicByInstitucionCooperanteId/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.getAspExtAcademicByInstitucionCooperante)
router.get('/getAspExtAcademicByAnoInscripcion/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.getAspExtAcademicByAnoInscripcion)
router.get('/getAspExtAcademicByPeriodoAcademicoById/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.getAspExtAcademicByPeriodoAcademico)
router.get('/getAspExtAcademicByProgramaAcademicoUisById/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.getAspExtAcademicByProgramaAcademicoUis)
router.delete('/deleteAspiranteExtAcademicById/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.deleteAspExtAcademicById) 
router.post('/', controller.saveOrUpdateAspExtAcademic)
router.post('/:_id', controllerAut.validacionUsuario, controllerAut.controlRutas, controller.saveOrUpdateAspExtAcademic)



module.exports = router