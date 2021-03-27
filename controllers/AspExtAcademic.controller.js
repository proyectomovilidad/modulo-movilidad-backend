const model = require("./../models/aspExtAcademic.models")
const modelPersonal = require("./../models/aspExtPersonal.models")
const modelInscripcion = require("./../models/inscripcion.models")
const validator = require('./../validators/aspExtAcademic.validators')


/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateAspExtAcademic = async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateAspExtAcademic(req.body)
        validator.transformObjectId(req.body)
       const aspExtAcademic = await model.saveOrUpdateAspExtAcademic(id, req.body)

        res.send({
          model:aspExtAcademic,
          status: true
        })
      } catch (e) {
        console.log(e);
      }
}

const getAspExtAcademic = async (req, res, next) => {
  try { 
      const aspExtAcademic = await model.getAspExtAcademic()
      res.send(aspExtAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspExtAcademicById = async (req, res, next) => {
  try { 
    const aspExtAcademicId = req.params['_id']
      const aspExtAcademic = await model.getAspExtAcademicById(aspExtAcademicId)
      res.send(aspExtAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


const getAspExtAcademicByInstitucionCooperante = async (req, res, next) => {
  try { 
    const institucionCooperanteId = req.params['_id']
      const aspExtAcademic = await model.getAspExtAcademicByInstitucionCooperante(institucionCooperanteId)
      res.send(aspExtAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspExtAcademicByAnoInscripcion = async (req, res, next) => {
  try { 
    const anoInscripcion = req.params['_id']
      const aspExtAcademic = await model.getAspExtAcademicByAnoInscripcion(anoInscripcion)
      res.send(aspExtAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspExtAcademicByPeriodoAcademico = async (req, res, next) => {
  try { 
    const periodoAcademicoId = req.params['_id']
      const aspExtAcademic = await model.getAspExtAcademicByPeriodoAcademico(periodoAcademicoId)
      res.send(aspExtAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspExtAcademicByProgramaAcademicoUis = async (req, res, next) => {
  try { 
    const programaAcademicoId = req.params['_id']
      const aspExtAcademic = await model.getAspExtAcademicByProgramaAcademicoUis(programaAcademicoId)
      res.send(aspExtAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const deleteAspExtAcademicById  = async (req, res, next) =>{
  try { 
    const id = req.params['_id']
     const aspExtAcademic = await model.deleteAspExtAcademicById(id)
      const aspExtPersonal = await modelPersonal.deleteAspExtPersonalByDocument(id)
      const inscripcion = await modelInscripcion.deleteAspExtInscripcionByDocument(id)

      res.send(aspExtAcademic)
    } catch (e) {
     // errorUtils.sendErrorResponse(res, e)
     console.log(e)
     res.send(aspExtAcademic)

    }
}


module.exports = {
    saveOrUpdateAspExtAcademic,
    getAspExtAcademic,
    getAspExtAcademicById,
    getAspExtAcademicByInstitucionCooperante,
    getAspExtAcademicByAnoInscripcion,
    getAspExtAcademicByPeriodoAcademico,
    deleteAspExtAcademicById,
    getAspExtAcademicByProgramaAcademicoUis
    
   
}