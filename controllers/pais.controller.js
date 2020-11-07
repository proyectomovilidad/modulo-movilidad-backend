const model = require("./../models/pais.models")
const validator = require('./../validators/pais.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdatePais= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validatePais(req.body)
        validator.transformObjectId(req.body)
       const pais = await model.saveOrUpdatePais(id, req.body)

        res.send(pais)
      } catch (e) {
        console.log(e);
      }
}

const getPais = async (req, res, next) => {
  try { 
      const pais = await model.getPais()
      res.send(pais)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdatePais,
    getPais
   
}
    