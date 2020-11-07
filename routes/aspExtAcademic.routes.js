const express = require('express')
const router = express.Router()
const controller = require("../controllers/AspExtAcademic.controller")


router.get('/getAspiranteExtAcademic/', controller.getAspExtAcademic)
router.get('/getAspExtAcademicById/:_id', controller.getAspExtAcademicById)
router.get('/getAspExtAcademicByInstitucionCooperanteId/:_id', controller.getAspExtAcademicByInstitucionCooperante)
router.get('/getAspExtAcademicByAnoInscripcion/:_id', controller.getAspExtAcademicByAnoInscripcion)
router.get('/getAspExtAcademicByPeriodoAcademicoById/:_id', controller.getAspExtAcademicByPeriodoAcademico)
router.get('/getAspExtAcademicByProgramaAcademicoUisById/:_id', controller.getAspExtAcademicByProgramaAcademicoUis)
router.post('/', controller.saveOrUpdateAspExtAcademic)
router.post('/:_id', controller.saveOrUpdateAspExtAcademic)



module.exports = router