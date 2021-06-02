const model = require("./../models/convocatoria.models")
const validator = require('./../validators/convocatoria.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateConvocatoria= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateConvocatoria(req.body)
        validator.transformObjectId(req.body)
       const convocatoria = await model.saveOrUpdateConvocatoria(id, req.body)

        res.send(convocatoria)
      } catch (e) {
        console.log(e);
      }
}

const getConvocatorias = async (req, res, next) => {
  try { 
      const convocatoria = await model.getConvocatorias()
      res.send(convocatoria)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


const getConvocatoriaById = async (req, res, next) => {
  try { 
    const convocatoriaId = req.params['_id']
      const convocatoria = await model.getConvocatoriaById(convocatoriaId)
      res.send(convocatoria)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const deleteConvocatoria  = async (req, res, next) =>{
  try { 
    const id = req.params['_id']
     const convocatoria = await model.deleteConvocatoria(id)
     
      res.send(convocatoria)
    } catch (e) {
     // errorUtils.sendErrorResponse(res, e)
     console.log(e)
     res.send(convocatoria)

    }
}




module.exports = {
  saveOrUpdateConvocatoria,
  getConvocatorias,
  getConvocatoriaById,
  deleteConvocatoria
   
}
    