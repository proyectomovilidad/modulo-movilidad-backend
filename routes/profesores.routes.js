const express = require('express')
const router = express.Router()
const controller = require("../controllers/profesores.controller")


router.get('/getProfesores', controller.getProfesores)
router.get('/getProfesoresById/:_id', controller.getProfesoresById)
router.get('/getProfesoresByDocumentoId/:_id', controller.getProfesoresByDocumentoId)
router.post('/', controller.saveOrUpdateProfesores)
router.post('/:_id', controller.saveOrUpdateProfesores)


module.exports = router