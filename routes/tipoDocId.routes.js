const express = require('express')
const router = express.Router()
const controller = require("../controllers/tipoDocId.controller")

router.get('/getTipoDocumentoId/', controller.getTipoDocumentoId)
router.post('/', controller.saveOrUpdateTipoDocumentoId)
router.post('/:_id', controller.saveOrUpdateTipoDocumentoId)


module.exports = router