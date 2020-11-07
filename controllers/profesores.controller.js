const model = require("./../models/profesores.models")
const validator = require('./../validators/profesores.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateProfesores= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateProfesores(req.body)
        validator.transformObjectId(req.body)
       const profesores = await model.saveOrUpdateProfesores(id, req.body)

        res.send(profesores)
      } catch (e) {
        console.log(e);
      }
}

const getProfesores = async (req, res, next) => {
  try { 
      const profesores = await model.getProfesores()
      res.send(profesores)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getProfesoresById = async (req, res, next) => {
  try { 
    const profesoresId = req.params['_id']
      const profesores = await model.getProfesoresById(profesoresId)
      res.send(profesores)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getProfesoresByDocumentoId = async (req, res, next) => {
  try { 
    const documentoId = req.params['_id']
      const profesores = await model.getProfesoresByDocumentoId(documentoId)
      res.send(profesores)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


module.exports = {
    saveOrUpdateProfesores,
    getProfesores,
    getProfesoresById,
    getProfesoresByDocumentoId
   
}