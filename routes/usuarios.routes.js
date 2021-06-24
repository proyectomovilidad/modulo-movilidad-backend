const express = require('express')
const router = express.Router()
const controller = require("../controllers/usuarios.controller")

router.get('/getAllUsuarios', controller.getAllUsuarios)
router.get('/getUsuarioById/:_id', controller.getUsuarioById)
router.post('/consultar', controller.consultarUsuario)
router.post('/saveUsuario', controller.saveUsuario)
router.post('/updateUsuario/:_id', controller.updateUsuario)
router.delete('/eliminarUsuario/:_id', controller.deleteUsuario)

module.exports = router;
