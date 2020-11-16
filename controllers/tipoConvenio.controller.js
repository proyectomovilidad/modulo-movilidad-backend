const model = require("./../models/tipoConvenio.models")
const validator = require('./../validators/tipoConvenio.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateTipoConvenio= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateTipoConvenio(req.body)
        validator.transformObjectId(req.body)
       const tipoConvenio = await model.saveOrUpdateTipoConvenio(id, req.body)

        res.send(tipoConvenio)
      } catch (e) {
        console.log(e);
      }
}

const getTipoConvenio = async (req, res, next) => {
  try { 
      const tipoConvenio = await model.getTipoConvenio()
      res.send(tipoConvenio)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdateTipoConvenio,
    getTipoConvenio,
   
   
}
    