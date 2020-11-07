const express = require('express')
const router = express.Router()
const controller = require("../controllers/AspUisPersonal.controller")

router.get('/getAspiranteUisPersonal/', controller.getAspiranteUisPersonal)
router.get('/getAspUisPersonalById/:_id', controller.getAspUisPersonalById)
router.post('/', controller.saveOrUpdateAspUisPersonal)
router.post('/:_id', controller.saveOrUpdateAspUisPersonal)


module.exports = router 