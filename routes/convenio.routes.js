const express = require('express')
const router = express.Router()
const controller = require("../controllers/convenio.controller")

router.get('/getConvenio/', controller.getConvenio)
router.get('/getConvenioById/:_id', controller.getConvenioById)
router.post('/', controller.saveOrUpdateConvenio)
router.post('/:_id', controller.saveOrUpdateConvenio)


module.exports = router