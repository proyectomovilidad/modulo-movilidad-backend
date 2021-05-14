const model = require("./../models/departamento.models")
const validator = require('./../validators/departamento.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateDepartamento= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateDepartamento(req.body)
        validator.transformObjectId(req.body)
       const departamento = await model.saveOrUpdateDepartamento(id, req.body)

        res.send(departamento)
      } catch (e) {
        console.log(e);
      }
}
 
const getDepartamentos = async (req, res, next) => {
  try { 
      const { codigo_pais } = req.body
      const departamentos = await model.getDepartamentos(codigo_pais)
      res.send(departamentos)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAllDepartamentos = async (req, res, next) => {
  try { 
      const departamentos = await model.getAllDepartamentos()
      res.send({status: true, data: departamentos})
    } catch (e) {
      res.send({message: e.toString(), status: false})
    }
}



module.exports = {
    saveOrUpdateDepartamento,
    getDepartamentos,
    getAllDepartamentos
   
   
}
    