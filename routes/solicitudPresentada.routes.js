const express = require('express')
const router = express.Router()
const controller = require("../controllers/solicitudPresentada.controller")


router.get('/getSolicitudPresentada', controller.getSolicitudPresentada)
router.get('/getSolicitudPresentadaByNumeroInscripcion/:_id', controller.getSolicitudPresentadaByNumeroInscripcion)
router.get('/getSolicitudPresentadaByEstadoSolicitudId/:_id', controller.getSolicitudPresentadaByEstadoSolicitud)
router.get('/getSolicitudPresentadaById/:_id', controller.getSolicitudPresentadaById)
router.get('/getSolicitudPresentadaByEstudiante/:documento_id', controller.getSolicitudesByEstudiante)
router.post('/', controller.saveOrUpdateSolicitudPresentada)
router.post('/:_id', controller.saveOrUpdateSolicitudPresentada)


module.exports = router
