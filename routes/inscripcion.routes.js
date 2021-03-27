const express = require('express')
const router = express.Router()
const controller = require("../controllers/inscripcion.controller")

router.get('/getInscripcion', controller.getInscripcion)
router.get('/getInscripcionByNumeroInscripcion/:_id', controller.getInscripcionByNumeroInscripcion)
router.get('/getInscripcionByTipoMovilidadId/:_id', controller.getInscripcionByTipoMovilidad)
router.get('/getInscripcionByTipoEstadoId/:_id', controller.getInscripcionByTipoEstado)
router.get('/getInscripcionBySedeId/:_id', controller.getInscripcionBySede)
router.get('/getInscripcionByInstitucionCooperanteId/:_id', controller.getInscripcionByInstitucionCooperante)
router.get('/getInscripcionByConvenioId/:_id', controller.getInscripcionByConvenio)
router.post('/', controller.saveOrUpdateInscripcion)
router.post('/:_id', controller.saveOrUpdateInscripcion)


module.exports = router