const model = require("./../models/tipoProyecto.models")
const validator = require('./../validators/tipoProyecto.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateTipoProyecto= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateTipoProyecto(req.body)
        validator.transformObjectId(req.body)
       const tipoProyecto = await model.saveOrUpdateTipoProyecto(id, req.body)

        res.send(tipoProyecto)
      } catch (e) {
        console.log(e);
      }
}

const getTiposProyecto = async (req, res, next) => {
  try { 
      const tiposProyecto = await model.getTiposProyecto()
      res.send(tiposProyecto)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdateTipoProyecto,
    getTiposProyecto,
   
   
}
    