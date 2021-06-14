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
      //errorUtils.sendErrorResponse(res, e)
      res.send({status: false, message: e.toString()})
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

const getTipoMovilidadByInstProgAcad = async (req, res, next)=>{
  try{
    const movilidades = await model.getTipoMovilidadByInstProgAcad(req.params.instId, req.params.progAcadId)
    res.send(movilidades)
  }catch(err){
    res.send({message: err, status: false})
  }
}

module.exports = {
    saveOrUpdateTipoMovilidad,
    getTipoMovilidadByInstProgAcad,
    getTipoMovilidad,
    getMovilidadById
   
   
}
