const model = require("./../models/institucionCooperante.models")
const validator = require('./../validators/institucionCooperante.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateInstitucionCooperante= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateInstitucionCooperante(req.body)
        validator.transformObjectId(req.body)
       const institucionCooperante = await model.saveOrUpdateInstitucionCooperante(id, req.body)

        res.send(institucionCooperante)
      } catch (e) {
        console.log(e);
      }
}

const getInstitucionCooperante = async (req, res, next) => {
  try { 
      const institucionCooperante = await model.getInstitucionCooperante()
      res.send(institucionCooperante)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInstitucionCooperanteById = async (req, res, next) => {
  try { 
    const institucionCooperanteId = req.params['_id']
      const institucionCooperante = await model.getInstitucionCooperanteById(institucionCooperanteId)
      res.send(institucionCooperante)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInstitucionByTipoMovilidad = async (req, res, next) => {
  try { 
    const tipoMovilidadId = req.params['_id']
    console.log("id", tipoMovilidadId)
      const institucion = await model.getInstitucionByTipoMovilidad(tipoMovilidadId)
      res.send(institucion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInstitucionCooperanteByPais = async (req, res, next) => {
  try { 
    const paisId = req.params['_id']
      const institucionCooperante = await model.getInstitucionCooperanteByPais(paisId)
      res.send(institucionCooperante)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInstitucionCooperanteByCiudad = async (req, res, next) => {
  try { 
    const ciudadId = req.params['_id']
      const institucionCooperante = await model.getInstitucionCooperanteByCiudad(ciudadId)
      res.send(institucionCooperante)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

module.exports = {
    saveOrUpdateInstitucionCooperante,
    getInstitucionCooperante,
    getInstitucionCooperanteById,
    getInstitucionCooperanteByPais,
    getInstitucionCooperanteByCiudad,
    getInstitucionByTipoMovilidad
   
}