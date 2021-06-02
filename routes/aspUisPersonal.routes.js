const express = require('express')
const router = express.Router()
const controller = require("../controllers/AspUisPersonal.controller")
const controllerAutc = require("../controllers/autenticacion.controller")


router.get('/getAspiranteUisPersonal/', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getAspiranteUisPersonal)
router.get('/getAspiranteUisPersonal/', controller.getAspiranteUisPersonal)
router.get('/getAspUisPersonalById/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.getAspUisPersonalById)
router.get('/getAspUisPersonalById/:_id', controller.getAspUisPersonalById)
router.get('/getAspirantesUisPersonal/', controller.getAspirantesUisPersonal)
router.post('/', controller.saveOrUpdateAspUisPersonal)
router.post('/consultarEstudiantes', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.consultarEstudiantes)
router.post('/consultarEstudiantes', controller.consultarEstudiantes)
router.post('/:_id', controllerAutc.validacionUsuario, controllerAutc.controlRutas, controller.saveOrUpdateAspUisPersonal)


module.exports = router 