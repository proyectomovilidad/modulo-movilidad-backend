const express = require('express')
const router = express.Router()
const controller = require("../controllers/pais.controller")


router.get('/getPais/', controller.getPais)
router.post('/', controller.saveOrUpdatePais)
router.post('/:_id', controller.saveOrUpdatePais)


module.exports = router


