const express = require('express')
const router = express.Router()
const controller = require("../controllers/encuesta.controller")

router.get('/getEncuesta/', controller.getEncuesta)
router.get('/getEncuestaByTipoId/:_id', controller.getEncuestaByTipo)
router.post('/', controller.saveOrUpdateEncuesta)
router.post('/:_id', controller.saveOrUpdateEncuesta)


module.exports = router