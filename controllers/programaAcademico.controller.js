const model = require("./../models/programaAcademico.models")
const validator = require('./../validators/programaAcademico.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateProgramaAcademico= async (req, res, next) => {
  try {
    const id = req.params['_id']
    if (!id) validator.validateProgramaAcademico(req.body)
    validator.transformObjectId(req.body)
    const programaAcademico = await model.saveOrUpdateProgramaAcademico(id, req.body)

    res.send(programaAcademico)
  } catch (e) {
    console.log(e);
  }
}

const getProgramaAcademico = async (req, res, next) => {
  try { 
    const programaAcademico = await model.getProgramaAcademico()
    res.send(programaAcademico)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getProgramaAcademicosByInstitucion = async (req, res, next) =>{
  try{
    const programaAcademicos = await model.getProgramaAcademicosByInstitucion(req.params.institucionId)

    res.send(programaAcademicos)
  }catch(e){
    res.send({message: e, status: false})

    // res.send({message: e, status: false})
  }
}



module.exports = {
  saveOrUpdateProgramaAcademico,
  getProgramaAcademico,
  getProgramaAcademicosByInstitucion 
}
    