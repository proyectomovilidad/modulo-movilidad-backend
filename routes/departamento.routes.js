const express = require('express')
const router = express.Router()
const controller = require("../controllers/departamento.controller")

router.post('/getDepartamentos/', controller.getDepartamentos)
router.post('/', controller.saveOrUpdateDepartamento)
router.post('/:_id', controller.saveOrUpdateDepartamento)


module.exports = router 