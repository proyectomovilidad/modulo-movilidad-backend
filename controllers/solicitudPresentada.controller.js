const model = require("../models/solicitudPresentada.models")
const validator = require('../validators/solicitudPresentada.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateSolicitudPresentada= async (req, res, next) => {
  try {
    const id = req.params['_id']
    if (!id) {
      validator.validateSolicitudPresentada(req.body)
      req.body.estado = 0;
    }
    validator.transformObjectId(req.body)
    const solicitudPresentada = await model.saveOrUpdateSolicitudPresentada(id, req.body)

    res.send(solicitudPresentada)
  } catch (e) {
    console.log(e);
  }
}

const getSolicitudPresentada = async (req, res, next) => {
  try {
    const solicitudPresentada = await model.getSolicitudPresentada()
    res.send(solicitudPresentada)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getSolicitudPresentadaByNumeroInscripcion = async (req, res, next) => {
  try {
    const numeroInscripcionId = req.params['_id']
    const solicitudPresentada = await model.getSolicitudPresentadaByNumeroInscripcion(numeroInscripcionId)
    res.send(solicitudPresentada)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}



const getSolicitudPresentadaByEstadoSolicitud = async (req, res, next) => {
  try {
    const estadoSolicitudId = req.params['_id']
    const solicitudPresentada = await model.getSolicitudPresentadaByEstadoSolicitud(estadoSolicitudId)
    res.send(solicitudPresentada)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}



const getSolicitudPresentadaById = async (req, res, next) => {
  try {
    const solicitudId = req.params['_id']
    const solicitudPresentada = await model.getSolicitudPresentadaById(solicitudId)
    res.send(solicitudPresentada)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getSolicitudesByEstudiante = async (req, res, next) => {
  try{
    const documento_id = req.params['documento_id']
    const solicitudPresentada = await model.getSolicitudesByEstudiante(documento_id);
    res.send({status: true, data: solicitudPresentada})
  }catch (e){
    res.send({status: false, message: e.toString()})
  }
}

module.exports = {
  saveOrUpdateSolicitudPresentada,
  getSolicitudPresentada,
  getSolicitudPresentadaByNumeroInscripcion,
  getSolicitudPresentadaByEstadoSolicitud,
  getSolicitudPresentadaById,
  getSolicitudesByEstudiante
}
