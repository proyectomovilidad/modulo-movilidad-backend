const express = require('express')
const router = express.Router()
const controller = require("../controllers/entidadFinanciera.controller")

router.get('/getEntidadFinanciera/', controller.getEntidadFinanciera)
router.post('/', controller.saveOrUpdateEntidadFinanciera)
router.post('/:_id', controller.saveOrUpdateEntidadFinanciera)


module.exports = router