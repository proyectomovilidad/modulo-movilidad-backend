const express = require('express')
const router = express.Router()
const controller = require("../controllers/tipoProyecto.controller")

router.get('/getTiposProyecto/', controller.getTiposProyecto)
router.post('/', controller.saveOrUpdateTipoProyecto)
router.post('/:_id', controller.saveOrUpdateTipoProyecto)

module.exports = router