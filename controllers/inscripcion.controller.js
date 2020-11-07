const model = require("./../models/inscripcion.models")
const validator = require('./../validators/inscripcion.validator')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateInscripcion = async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateInscripcion(req.body)
        validator.transformObjectId(req.body)
       const inscripcion = await model.saveOrUpdateInscripcion(id, req.body)

        res.send(inscripcion)
      } catch (e) {
        console.log(e);
      }
}

const getInscripcion = async (req, res, next) => {
  try { 
      const inscripcion = await model.getInscripcion()
      res.send(inscripcion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


const getInscripcionByNumeroInscripcion = async (req, res, next) => {
  try { 
    const numeroInscripcionId = req.params['_id']
      const inscripcion = await model.getInscripcionByNumeroInscripcion(numeroInscripcionId)
      res.send(inscripcion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInscripcionByTipoMovilidad = async (req, res, next) => {
  try { 
    const tipoMovilidadId = req.params['_id']
      const inscripcion = await model.getInscripcionByTipoMovilidad(tipoMovilidadId)
      res.send(inscripcion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInscripcionByTipoEstado = async (req, res, next) => {
  try { 
    const tipoEstadoId = req.params['_id']
      const inscripcion = await model.getInscripcionByTipoEstado(tipoEstadoId)
      res.send(inscripcion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInscripcionBySede = async (req, res, next) => {
  try { 
    const sede = req.params['_id']
      const inscripcion = await model.getInscripcionBySede(sede)
      res.send(inscripcion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInscripcionByInstitucionCooperante = async (req, res, next) => {
  try { 
    const institucionCooperanteId = req.params['_id']
      const inscripcion = await model.getInscripcionByInstitucionCooperante(institucionCooperanteId)
      res.send(inscripcion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInscripcionByConvenio = async (req, res, next) => {
  try { 
    const convenioId = req.params['_id']
      const inscripcion = await model.getInscripcionByConvenio(convenioId)
      res.send(inscripcion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getInscripcionByProgramaAcademico = async (req, res, next) => {
  try { 
    const programaAcademicoId = req.params['_id']
      const inscripcion = await model.getInscripcionByProgramaAcademico(programaAcademicoId)
      res.send(inscripcion)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdateInscripcion,
    getInscripcion,
    getInscripcionByNumeroInscripcion,
    getInscripcionByTipoMovilidad,
    getInscripcionByTipoEstado,
    getInscripcionBySede,
    getInscripcionByInstitucionCooperante,
    getInscripcionByConvenio,
    getInscripcionByProgramaAcademico
    
    
   
}