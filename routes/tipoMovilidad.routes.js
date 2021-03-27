const express = require('express')
const router = express.Router()
const controller = require("../controllers/tipoMovilidad.controller")

router.get('/getTipoMovilidad/', controller.getTipoMovilidad)
router.get('/getTipoMovilidadById/:id', controller.getMovilidadById)
router.post('/', controller.saveOrUpdateTipoMovilidad)
router.post('/:_id', controller.saveOrUpdateTipoMovilidad)

module.exports = router