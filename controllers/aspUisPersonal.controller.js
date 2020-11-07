const model = require("./../models/aspUisPersonal.models")
const validator = require('./../validators/aspUisPersonal.validator')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateAspUisPersonal = async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateAspUisPersonal(req.body)
        validator.transformObjectId(req.body)
       const aspUisPersonal = await model.saveOrUpdateAspUisPersonal(id, req.body)

        res.send(aspUisPersonal)
      } catch (e) {
        console.log(e);
      }
}

const getAspiranteUisPersonal = async (req, res, next) => {
  try { 
      const aspUisPersonal = await model.getAspiranteUisPersonal()
      res.send(aspUisPersonal)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspUisPersonalById = async (req, res, next) => {
  try { 
    const aspUisPersonalId = req.params['_id']
      const aspUisPersonal = await model.getAspUisPersonalById(aspUisPersonalId)
      res.send(aspUisPersonal)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


module.exports = {
    saveOrUpdateAspUisPersonal,
    getAspiranteUisPersonal,
    getAspUisPersonalById
   
}