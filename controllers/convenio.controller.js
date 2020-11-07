const model = require("./../models/convenio.models")
const validator = require('./../validators/convenio.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateConvenio= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateConvenio(req.body)
        validator.transformObjectId(req.body)
       const convenio = await model.saveOrUpdateConvenio(id, req.body)

        res.send(convenio)
      } catch (e) {
        console.log(e);
      }
}

const getConvenio = async (req, res, next) => {
  try { 
      const convenio = await model.getConvenio()
      res.send(convenio)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


const getConvenioById = async (req, res, next) => {
  try { 
    const convenioId = req.params['_id']
      const convenio = await model.getConvenioById(convenioId)
      res.send(convenio)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}




module.exports = {
    saveOrUpdateConvenio,
    getConvenio,
    getConvenioById
   
}
    