const express = require('express')
const router = express.Router()
const controller = require("../controllers/programaAcademico.controller")

router.get('/getProgramaAcademico/', controller.getProgramaAcademico)
router.post('/', controller.saveOrUpdateProgramaAcademico)
router.post('/:_id', controller.saveOrUpdateProgramaAcademico)


module.exports = router