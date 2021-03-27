const express = require('express')
const router = express.Router()
const controller = require("../controllers/convenio.controller")

router.get('/getConvenios/', controller.getConvenio)
router.get('/getConvenioById/:_id', controller.getConvenioById)
router.get('/getConvenioByTipoMovilidad/:_id', controller.getConvenioByTipoMovilidad)
router.get('/getConvenioByInstitucion/:_id', controller.getConvenioByInstitucion)
router.get('/getConveniosConsulta',  controller.getConveniosConsulta)
router.post('/consultarConvenios', controller.consultarConvenios)
router.delete('/deleteConvenio/:_id', controller.deleteConvenio) 
router.post('/', controller.saveOrUpdateConvenio)
router.put('/:_id', controller.saveOrUpdateConvenio)


module.exports = router