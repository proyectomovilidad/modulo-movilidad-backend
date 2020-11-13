const model = require("./../models/entidadFinanciera.models")
const validator = require('./../validators/entidadFinanciera.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateEntidadFinanciera= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateEntidadFinanciera(req.body)
        validator.transformObjectId(req.body)
       const entidadFinanciera = await model.saveOrUpdateEntidadFinanciera(id, req.body)

        res.send(entidadFinanciera)
      } catch (e) {
        console.log(e);
      }
}

const getEntidadFinanciera = async (req, res, next) => {
  try { 
      const entidadFinanciera = await model.getEntidadFinanciera()
      res.send(entidadFinanciera)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdateEntidadFinanciera,
    getEntidadFinanciera,
   
   
}
    