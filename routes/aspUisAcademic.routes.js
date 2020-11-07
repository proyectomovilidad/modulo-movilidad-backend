const express = require('express')
const router = express.Router()
const controller = require("../controllers/AspUisAcademic.controller")

router.get('/getAspUisAcademicByCodigo/:_id', controller.getAspUisAcademicByCodigo)
router.get('/getAspUisAcademicById/:_id', controller.getAspUisAcademicById)
router.get('/getAspUisAcademicByAnoInscripcion/', controller.getAspUisAcademicByAnoInscripcion)
router.get('/getAspUisAcademicByPeriodoAcademicoId/:_id', controller.getAspUisAcademicByPeriodoAcademico)
router.get('/getAspiranteUisAcademicByProgramaAcademicId/:_id', controller.getAspUisAcademicByProgramaAcademico)
router.get('/getAspiranteUisAcademic/', controller.getAspUisAcademic)
router.post('/', controller.saveOrUpdateAspUisAcademic)
router.post('/:_id', controller.saveOrUpdateAspUisAcademic)

module.exports = router