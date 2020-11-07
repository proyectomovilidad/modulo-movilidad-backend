const express = require('express')
const router = express.Router()
const controller = require("../controllers/cargaDocumentos.controller")

router.get('/getCargaDocumentosByNumeroInscripcionId/:_id', controller.getCargaDocumentosByNumeroInscripcion)
router.post('/', controller.saveOrUpdateCargaDocumentos)
router.post('/:_id', controller.saveOrUpdateCargaDocumentos)


module.exports = router