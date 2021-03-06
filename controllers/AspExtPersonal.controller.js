const model = require("./../models/aspExtPersonal.models")
const modelUsuario = require("./../models/usuarios.models")
const validator = require('./../validators/aspExtPersonal.validators')
const errorUtils = require("./../shared/error.shared")




/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateAspExtPersonal = async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateAspExtPersonal(req.body)
        validator.transformObjectId(req.body)
       const aspExtPersonal = await model.saveOrUpdateAspExtPersonal(id, req.body)
       const usuario = await modelUsuario.saveOrUpdateUsuario(req.body.correo, {correo: req.body.correo,
        contrasena: req.body.documento_id, rol: 3}) 
         
        res.send({
          model: aspExtPersonal,
          status: true
        })
      } catch (e) {
        console.log(e);
      }
}


const getAspExtPersonal = async (req, res, next) => {
  try { 
      const aspExtPersonal = await model.getAspExtPersonal()
      res.send(aspExtPersonal)
      console.log('aca: ',aspExtPersonal)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspExtPersonalById = async (req, res, next) => {
  try { 
    const aspExtPersonalId = req.params['_id']
      const aspExtPersonal = await model.getAspExtPersonalById(aspExtPersonalId)
      res.send(aspExtPersonal)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspExtPersonalByDocumentoId = async (req, res, next) => {
  try { 
    const documentoId = req.params['documentId']
      const aspExtPersonal = await model.getAspExtPersonalByDocumentoId(documentoId)
      res.send(aspExtPersonal)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getAspirantesExtPersonal = async (req, res, next) => {
  try { 
      const aspExtPersonal = await model.getAspirantesExtPersonal()
      res.send(aspExtPersonal)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


const consultarExternos = async (req, res, next) => {
  try {
      
     const aspExtPersonal = await model.consultarExternos(req.body)
      res.send(aspExtPersonal)
    } catch (e) {
      console.log(e);
    }
} 


module.exports = {
    saveOrUpdateAspExtPersonal,
    getAspExtPersonal,
    getAspExtPersonalById,
    getAspExtPersonalByDocumentoId,
    getAspirantesExtPersonal,
    consultarExternos
   
}