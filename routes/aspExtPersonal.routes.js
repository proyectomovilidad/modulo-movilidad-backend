const express = require('express')
const router = express.Router()
const controller = require("../controllers/AspExtPersonal.controller")



router.get('/getAspiranteExtPersonal/', controller.getAspExtPersonal)
router.get('/getAspExtPersonalById/:_id', controller.getAspExtPersonalById)
router.get('/getAspExtPersonalByDocumentoId/:documentId', controller.getAspExtPersonalByDocumentoId)
router.get('/getAspirantesExtPersonal/', controller.getAspirantesExtPersonal)
router.post('/', controller.saveOrUpdateAspExtPersonal)
router.post('/consultarExternos', controller.consultarExternos)
router.post('/:_id', controller.saveOrUpdateAspExtPersonal)


module.exports = router