const express = require('express')
const router = express.Router()
const controller = require("../controllers/entornoMovilidad.controller")

router.post('/', controller.saveOrUpdateFechasMovSaliente)
router.post('/:_id', controller.saveOrUpdateFechasMovSaliente)

router.post('/', controller.saveOrUpdateFechasMovEntrante)
router.post('/:_id', controller.saveOrUpdateFechasMovEntrante)

module.exports = router 