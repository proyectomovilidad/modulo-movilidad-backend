const express = require('express')
const router = express.Router()
const controller = require("../controllers/institucionCooperante.controller")

router.get('/getInstitucionCooperante', controller.getInstitucionCooperante)
router.get('/getInstitucionCooperanteById/:_id', controller.getInstitucionCooperanteById)
router.get('/getInstitucionCooperanteByPaisId/:_id', controller.getInstitucionCooperanteByPais)
router.get('/getInstitucionCooperanteByCiudadId/:_id', controller.getInstitucionCooperanteByCiudad)
router.post('/', controller.saveOrUpdateInstitucionCooperante)
router.post('/:_id', controller.saveOrUpdateInstitucionCooperante)


module.exports = router 