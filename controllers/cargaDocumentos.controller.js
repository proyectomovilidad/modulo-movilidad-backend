const model = require("./../models/cargaDocumentos.models")
const validator = require('./../validators/cargaDocumentos.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateCargaDocumentos= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validatecargaDocumentos(req.body)
        validator.transformObjectId(req.body)
       const cargaDocumentos = await model.saveOrUpdateCargaDocumentos(id, req.body)

        res.send(cargaDocumentos)
      } catch (e) {
        console.log(e);
      }
}


const getCargaDocumentosByNumeroInscripcion = async (req, res, next) => {
  try { 
    const numeroInscripcionId = req.params['_id']
      const cargaDocumentos = await model.getCargaDocumentosByNumeroInscripcion(numeroInscripcionId)
      res.send(cargaDocumentos)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


module.exports = {
    saveOrUpdateCargaDocumentos,
    getCargaDocumentosByNumeroInscripcion
   
}