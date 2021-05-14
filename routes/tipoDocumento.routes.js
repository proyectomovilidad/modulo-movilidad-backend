const express = require('express')
const router = express.Router()
const controller = require("../controllers/tipoDocumento.controller")

router.get('/getDocumento/', controller.getDocumento)
router.get('/getDocumentoByConvenio/:_id', controller.getDocumentoByConvenio)

router.post('/saveTipoDocumentoConvenio/', controller.saveTipoDocumentoConvenio)
router.post('/removeTipoDocumentoConvenio/:_id', controller.removeTipoDocumentoConvenio)
router.get('/getTipoDocumentoConvenios/', controller.getTipoDocumentoConvenios)
router.post('/getDocumentoByConsulta/', controller.getDocumentoByConsulta)

router.post('/:_id', controller.saveOrUpdateDocumento)
router.post('/', controller.saveOrUpdateDocumento)
module.exports = router