const express = require('express')
const router = express.Router()
const controller = require("../controllers/preguntas.controller")

router.get('/getPreguntas', controller.getPreguntas)
router.get('/getPreguntasById/:_id', controller.getPreguntasById)
router.get('/getPreguntasByTipoId/:_id', controller.getPreguntasByTipo)
router.post('/', controller.saveOrUpdatePreguntas)
router.post('/:_id', controller.saveOrUpdatePreguntas)


module.exports = router

