const model = require("./../models/tipoDocId.models")
const validator = require('../validators/tipoDocId.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateTipoDocumentoId= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateTipoDocumentoId(req.body)
        validator.transformObjectId(req.body)
       const tipoDocumentoId = await model.saveOrUpdateTipoDocumentoId(id, req.body)

        res.send(tipoDocumentoId)
      } catch (e) {
        console.log(e);
      }
}

const getTipoDocumentoId = async (req, res, next) => {
  try { 
      const tipoDocumentoId = await model.getTipoDocumentoId()
      res.send(tipoDocumentoId)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdateTipoDocumentoId,
    getTipoDocumentoId
   
}
    