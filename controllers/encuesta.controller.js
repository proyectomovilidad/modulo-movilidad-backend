const model = require("./../models/encuesta.models")
const validator = require('./../validators/encuesta.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateEncuesta= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateEncuesta(req.body)
        validator.transformObjectId(req.body)
       const encuesta = await model.saveOrUpdateEncuesta(id, req.body)

        res.send(encuesta)
      } catch (e) {
        console.log(e);
      }
}


const getEncuesta = async (req, res, next) => {
  try { 
      const encuesta = await model.getEncuesta()
      res.send(encuesta)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getEncuestaByTipo = async (req, res, next) => {
  try { 
    const tipoEncuestaId = req.params['_id']
      const encuesta = await model.getEncuestaByTipo(tipoEncuestaId)
      res.send(encuesta)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdateEncuesta,
    getEncuesta,
    getEncuestaByTipo
   
}