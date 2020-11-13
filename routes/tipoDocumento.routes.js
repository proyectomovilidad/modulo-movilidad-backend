const express = require('express')
const router = express.Router()
const controller = require("../controllers/tipoDocumento.controller")

router.get('/getDocumento/', controller.getDocumento)
router.post('/', controller.saveOrUpdateDocumento)
router.post('/:_id', controller.saveOrUpdateDocumento)

module.exports = router