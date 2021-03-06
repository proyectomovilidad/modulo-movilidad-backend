const express = require('express')
const router = express.Router()
const controller = require("../controllers/institucionCooperante.controller")

router.get('/getInstitucionCooperante', controller.getInstitucionCooperante)
router.get('/getInstitucionCooperanteById/:_id', controller.getInstitucionCooperanteById)
router.get('/getInstitucionByTipoMovilidad/:_id', controller.getInstitucionByTipoMovilidad)
router.get('/getInstitucionCooperanteByPaisId/:_id', controller.getInstitucionCooperanteByPais)
router.get('/getInstitucionCooperanteByCiudadId/:_id', controller.getInstitucionCooperanteByCiudad)
router.delete('/deleteInstitucionCooperante/:_id', controller.deleteInstitucionCooperante)
router.post('/consultar', controller.consultar)
router.post('/', controller.saveOrUpdateInstitucionCooperante)
router.post('/:_id', controller.saveOrUpdateInstitucionCooperante)


module.exports = router 
