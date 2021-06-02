const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const controller = require("../controllers/cargaDocumentos.controller")
const controllerAutc = require('../controllers/autenticacion.controller')

const multiPartMiddleware = multipart({
	//uploadDir: __dirname +'/../uploadFiles'
})

router.get('/getCargaDocumentosByNumeroInscripcionId/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getCargaDocumentosByNumeroInscripcion)
router.post('/', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.saveOrUpdateCargaDocumentos) 
router.post('/saveDocumentoFile', multiPartMiddleware, controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.saveDocumentoFile)
router.post('/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.saveOrUpdateCargaDocumentos)
router.get('/getDocumentos', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getDocumentos)
router.get('/getDocumentosByNombre/:fileName', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getDocumentosByNombre)
router.get('/getDocumentosByNombre/:fileName',controller.getDocumentosByNombre)
router.post('/eliminarDocumentoByNombre/:fileName', controller.eliminarDocumentoByNombre)
module.exports = router