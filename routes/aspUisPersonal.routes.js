const express = require('express')
const router = express.Router()
const controller = require("../controllers/AspUisPersonal.controller")
const controllerAutenticacion = require("../controllers/autenticacion.controller")


router.get('/getAspiranteUisPersonal/', controller.getAspiranteUisPersonal)
router.get('/getAspUisPersonalById/:_id', controller.getAspUisPersonalById)
router.get('/getAspirantesUisPersonal/', controller.getAspirantesUisPersonal)
router.post('/', controller.saveOrUpdateAspUisPersonal)
router.post('/consultarEstudiantes', controller.consultarEstudiantes)
router.post('/:_id', controller.saveOrUpdateAspUisPersonal)


module.exports = router 