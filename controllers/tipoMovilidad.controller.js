const model = require("./../models/tipoMovilidad.models")
const validator = require('./../validators/tipoMovilidad.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateTipoMovilidad= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateTipoMovilidad(req.body)
        validator.transformObjectId(req.body)
       const tipoMovilidad = await model.saveOrUpdateTipoMovilidad(id, req.body)

        res.send(tipoMovilidad)
      } catch (e) {
        console.log(e);
      }
}

const getTipoMovilidad = async (req, res, next) => {
  try { 
      const tipoMovilidad = await model.getTipoMovilidad()
      res.send(tipoMovilidad)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getMovilidadById = async (req, res, next) => {
  try { 
    const movilidadId = req.params['id']
      const movilidad = await model.getMovilidadById(movilidadId)
      res.send(movilidad)
    } catch (e) {
     // errorUtils.sendErrorResponse(res, e)  
    
    }
}



module.exports = {
    saveOrUpdateTipoMovilidad,
    getTipoMovilidad,
    getMovilidadById
   
   
}
    