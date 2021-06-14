const express = require('express')
const router = express.Router()
const controller = require("../controllers/convocatoria.controller")

router.get('/getConvocatorias/', controller.getConvocatorias)
router.get('/getConvocatoriaById/:_id', controller.getConvocatoriaById)
router.delete('/deleteConvocatoria/:_id', controller.deleteConvocatoria)
router.post('/consultar', controller.consultar)
router.post('/', controller.saveOrUpdateConvocatoria)
router.post('/:_id', controller.saveOrUpdateConvocatoria)


module.exports = router
