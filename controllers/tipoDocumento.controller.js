const model = require("./../models/tipoDocumento.models")
const validator = require('./../validators/tipoDocumento.validators')


/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateDocumento= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateDocumento(req.body)
        validator.transformObjectId(req.body)
       const documento = await model.saveOrUpdateDocumento(id, req.body)

        res.send(documento)
      } catch (e) {
        console.log(e);
      }
}

const getDocumento = async (req, res, next) => {
  try { 
      const documento = await model.getDocumento()
      res.send(documento)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
  saveOrUpdateDocumento,
    getDocumento,
   
   
}
    