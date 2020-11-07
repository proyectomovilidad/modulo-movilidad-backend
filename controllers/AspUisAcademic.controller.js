const model = require("./../models/aspUisAcademic.models")
const validator = require('./../validators/aspUisAcademic.validator')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateAspUisAcademic = async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateAspUisAcademic(req.body)
        validator.transformObjectId(req.body)
       const aspUisAcademic = await model.saveOrUpdateAspUisAcademic(id, req.body)

        res.send(aspUisAcademic)
      } catch (e) {
        console.log(e);
      }
}



const getAspUisAcademic = async (req, res, next) => {
  try { 
      const aspUisAcademic = await model.getAspUisAcademic()
      res.send(aspUisAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspUisAcademicById = async (req, res, next) => {
  try { 
    const aspUisAcademicId = req.params['_id']
      const aspUisAcademic = await model.getAspUisAcademicById(aspUisAcademicId)
      res.send(aspUisAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


const getAspUisAcademicByProgramaAcademico = async (req, res, next) => {
  try { 
    const programaAcademicoId = req.params['_id']
      const aspUisAcademic = await model.getAspUisAcademicByProgramaAcademico(programaAcademicoId)
      res.send(aspUisAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspUisAcademicByPeriodoAcademico = async (req, res, next) => {
  try { 
    const programaAcademicoId = req.params['_id']
      const aspUisAcademic = await model.getAspUisAcademicByPeriodoAcademico(programaAcademicoId)
      res.send(aspUisAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspUisAcademicByCodigo = async (req, res, next) => {
  try { 
    const codigo = req.params['_id']
      const aspUisAcademic = await model.getAspUisAcademicByCodigo(codigo)
      res.send(aspUisAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspUisAcademicByAnoInscripcion = async (req, res, next) => {
  try { 
    const anoInscripcion = req.params['_id']
      const aspUisAcademic = await model.getAspUisAcademicByAnoInscripcion(anoInscripcion)
      res.send(aspUisAcademic)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}








module.exports = {
    saveOrUpdateAspUisAcademic,
    getAspUisAcademicByProgramaAcademico,
    getAspUisAcademic,
    getAspUisAcademicById,
    getAspUisAcademicByCodigo,
    getAspUisAcademicByPeriodoAcademico,
    getAspUisAcademicByAnoInscripcion
   
}