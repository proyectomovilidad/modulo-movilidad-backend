const model = require("./../models/entornoMovilidad.models")
const validator = require('./../validators/entornoMovilidad.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateFechasMovSaliente= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateEntornoMovilidad(req.body)
        validator.transformObjectId(req.body)
       const movilidadSaliente = await model.saveOrUpdateFechasMovSaliente(id, req.body)

        res.send(movilidadSaliente)
      } catch (e) {
        console.log(e);
      }
} 

const saveOrUpdateFechasMovEntrante= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateEntornoMovilidad(req.body)
        validator.transformObjectId(req.body)
       const movilidadEntrante = await model.saveOrUpdateFechasMovEntrante(id, req.body)

        res.send(movilidadEntrante)
      } catch (e) {
        console.log(e);
      }
}



module.exports = {
    saveOrUpdateFechasMovSaliente,
    saveOrUpdateFechasMovEntrante
   
}
    