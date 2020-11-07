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

const getDepartamento = async (req, res, next) => {
  try { 
      const departamento = await model.getDepartamento()
      res.send(departamento)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdateDepartamento,
    getDepartamento,
   
   
}
    