const model = require("./../models/preguntas.models")
const validator = require('./../validators/preguntas.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdatePreguntas= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validatePreguntas(req.body)
        validator.transformObjectId(req.body)
       const preguntas = await model.saveOrUpdatePreguntas(id, req.body)

        res.send(preguntas)
      } catch (e) {
        console.log(e);
      }
}

const getPreguntas = async (req, res, next) => {
  try { 
      const preguntas = await model.getPreguntas()
      res.send(preguntas)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getPreguntasById = async (req, res, next) => {
  try { 
    const preguntasId = req.params['_id']
      const preguntas = await model.getPreguntasById(preguntasId)
      res.send(preguntas)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getPreguntasByTipo = async (req, res, next) => {
  try { 
    const tipoPreguntaId = req.params['_id']
      const preguntas = await model.getPreguntasByTipo(tipoPreguntaId)
      res.send(preguntas)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}



module.exports = {
    saveOrUpdatePreguntas,
    getPreguntas,
    getPreguntasById,
    getPreguntasByTipo
   
}
    