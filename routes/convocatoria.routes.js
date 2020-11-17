const express = require('express')
const router = express.Router()
const controller = require("../controllers/convocatoria.controller")

router.get('/getConvocatorias/', controller.getConvocatorias)
router.get('/getConvocatoriaById/:_id', controller.getConvocatoriaById)
router.post('/', controller.saveOrUpdateConvocatoria)
router.post('/:_id', controller.saveOrUpdateConvocatoria)


module.exports = router