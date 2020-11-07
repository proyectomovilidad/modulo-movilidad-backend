const express = require('express')
const router = express.Router()
const controller = require("../controllers/ciudad.controller")

router.get('/getCiudad/', controller.getCiudad)
router.post('/', controller.saveOrUpdateCiudad)
router.post('/:_id', controller.saveOrUpdateCiudad)
router.delete ('/:_id', controller.deleteCiudad)

module.exports = router