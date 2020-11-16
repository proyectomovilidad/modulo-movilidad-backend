const express = require('express')
const router = express.Router()
const controller = require("../controllers/tipoConvenio.controller")

router.get('/getTipoConvenio/', controller.getTipoConvenio)
router.post('/', controller.saveOrUpdateTipoConvenio)
router.post('/:_id', controller.saveOrUpdateTipoConvenio)

module.exports = router