const express = require('express')
const router = express.Router()
const controller = require("../controllers/tipoApoyo.controller")

router.get('/getApoyo/', controller.getApoyo)
router.get('/getTipoApoyoByEstrato/:estratos', controller.getTipoApoyoByEstrato)
router.get('/getTipoApoyoById/:_id', controller.getTipoApoyoById)
router.post('/', controller.saveOrUpdateApoyo)
router.delete('/deleteApoyo/:_id', controller.deleteApoyo)
router.post('/:_id', controller.saveOrUpdateApoyo)


module.exports = router 
