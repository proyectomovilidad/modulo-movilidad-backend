const model = require("./../models/inscripcion.models")
const modelUisAcademic = require("./../models/aspUisAcademic.models")
const modelConvenio = require("./../models/convenio.models")
const modelExtAcademic = require("./../models/aspExtAcademic.models")
const modelAspUisPersonal = require('./../models/aspUisPersonal.models')
const modelAspExtPersonal = require('./../models/aspExtPersonal.models')
const validator = require('./../validators/inscripcion.validator')
const { request } = require("express")




/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateInscripcion = async (req, res, next) => {
  try {
    const id = req.params['_id']
    if (!id) validator.validateInscripcion(req.body)
    validator.transformObjectId(req.body)
    const tipoEstudiante = {};
    if (req.body.codigo_est) {
      tipoEstudiante.codigo_est = req.body.codigo_est
    } else if (req.body.documento_id) {
      tipoEstudiante.documento_id = req.body.documento_id
    }
    const valido = await validatarInscripcionConvenio(tipoEstudiante, req.body.nombre_convenio)

  /*  if (!id && !valido) {
      console.log("no se escribió")
      return res.send({
        status: false,
        message: "No se pudo realizar la inscripción de estudiante"
      })
    } */
    req.body.estado = valido.estado;

    const inscripcion = await model.saveOrUpdateInscripcion(id, req.body)
    console.log("inscripcion", inscripcion)
    res.send({ model: inscripcion, status: true })
  } catch (e) {
    console.log(e);
  }
}

const getInscripcion = async (req, res, next) => {
  try {
    const inscripcion = await model.getInscripcion()
    res.send(inscripcion)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}


const getInscripcionByNumeroInscripcion = async (req, res, next) => {
  try {
    const numeroInscripcionId = req.params['_id']
    const inscripcion = await model.getInscripcionByNumeroInscripcion(numeroInscripcionId)
    res.send(inscripcion)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getInscripcionByTipoMovilidad = async (req, res, next) => {
  try {
    const tipoMovilidadId = req.params['_id']
    const inscripcion = await model.getInscripcionByTipoMovilidad(tipoMovilidadId)
    res.send(inscripcion)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getInscripcionByTipoEstado = async (req, res, next) => {
  try {
    const tipoEstadoId = req.params['_id']
    const inscripcion = await model.getInscripcionByTipoEstado(tipoEstadoId)
    res.send(inscripcion)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getInscripcionBySede = async (req, res, next) => {
  try {
    const sede = req.params['_id']
    const inscripcion = await model.getInscripcionBySede(sede)
    res.send(inscripcion)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getInscripcionByInstitucionCooperante = async (req, res, next) => {
  try {
    const institucionCooperanteId = req.params['_id']
    const inscripcion = await model.getInscripcionByInstitucionCooperante(institucionCooperanteId)
    res.send(inscripcion)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getInscripcionByConvenio = async (req, res, next) => {
  try {
    const convenioId = req.params['_id']
    const inscripcion = await model.getInscripcionByConvenio(convenioId)
    res.send(inscripcion)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const getAspirantesExtPersonalAdmitidos = async (req, res, next)=>{
  try{
    const estudiantes = modelAspExtPersonal.getAspirantesExtPersonalAdmitidos()
    res.send(estudiantes)

  }catch(e){
    res.send({message:e.toString(), status: false})
  }
}

const getAspirantesUisPersonalAdmitidos = async (req, res, next)=>{
  try{
    const estudiantes = modelAsUisPersonal.getAspirantesUisPersonalAdmitidos()
    res.send(estudiantes)

  }catch(e){
    res.send({message:e.toString(), status: false})
  }
}

const cambiarEstadoInscripcionById = async (req, res, next)=>{
  try{    
    let inscripcion = await model.cambiarEstadoInscripcionById(req.body.estado, req.params._id)

    res.send({inscripcion: inscripcion, status: true})
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const cambiarEstadoInscripcionAuto = async (req, res, next)=>{
  try{
    let convenios = await modelConvenio.getConvenioActivo(new Date())

    convenios.forEach(async element=>{
        let estudiantes = await modelAsUisPersonal.consultarEstudiantes({
          'Inscripcion.nombre_convenio': 2
        })
        let externos = await modelAspExtPersonal.getAspirantesExtPersonal()
    })

    const inscripcion = await model.cambiarEstadoInscripcionById(req.params._id)

    res.send({model: inscripcion, status: true})
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const updateInscripcionStatus = async (req, res, next)=>{
  try{
    const inscripcion = await model.updateInscripcionStatus(req.body, req.params._id)
    res.send({inscripcion: inscripcion, status: true})

  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const validatarInscripcionConvenio = async (tipoEstudiante, nombre_convenio) => {

  // try {

  if (tipoEstudiante.codigo_est) {
    const datosAcademicos = await modelUisAcademic.getAspUisAcademicByEstado(tipoEstudiante.codigo_est)

    const convenios = await modelConvenio.getConvenioById(nombre_convenio)
    console.log('convenioProm: ',convenios[0].promedio, ' credCursar: ',convenios[0].cred_cursar)
    console.log('estudiante prom: ',datosAcademicos[0].promedio, ' cred: ', datosAcademicos[0].cred_cursar)
    console.log('valid: ',Number(datosAcademicos[0].promedio) >= Number(convenios[0].promedio))
    console.log('valid2: ', Number(datosAcademicos[0].cred_cursar) >= Number(convenios[0].cred_cursar) )

    if (Number(datosAcademicos[0].promedio) >= Number(convenios[0].promedio) && Number(datosAcademicos[0].cred_cursados) >= Number(convenios[0].cred_cursados) && Number(datosAcademicos[0].cred_cursar) >= Number(convenios[0].cred_cursar)) {
      const inscripciones = await model.getInscripcionByEstudiante({codigo_est: tipoEstudiante.codigo_est, estado: '3'})
      const estadoInscripcion = inscripciones.length > 0 ? '5' : '1'
      
      return {
        status: true,
        estado: estadoInscripcion
      }
    } else {
      return {
        status: false,
        estado: "-1"
      }
    }


  } else {
    const datosAcademicos = await modelExtAcademic.getAspExtAcademicByEstado(tipoEstudiante.documento_id)
    const convenios = await modelConvenio.getConvenioById(nombre_convenio)

    if (Number(datosAcademicos[0].promedio) >= Number(convenios[0].promedio) && Number(datosAcademicos[0].cred_cursados) >= Number(convenios[0].cred_cursados) && Number(datosAcademicos[0].cred_cursar) >= Number(convenios[0].cred_cursar)) {
      const inscripciones = await model.getInscripcionByEstudiante({documento_id: tipoEstudiante.documento_id, estado: '3'})
      const estadoInscripcion = inscripciones.length > 0 ? '5' : '1'

      return {
        status: true,
        estado: estadoInscripcion
      }
    } else {
      return {
        status: false,
        estado: "-1"
      };
    }
  }
  // } catch (e) {
  console.log("Prueba del metodo")


  //  }
}




module.exports = {
  saveOrUpdateInscripcion,
  getInscripcion,
  getInscripcionByNumeroInscripcion,
  getInscripcionByTipoMovilidad,
  getInscripcionByTipoEstado,
  getInscripcionBySede,
  getInscripcionByInstitucionCooperante,
  getInscripcionByConvenio,
  getAspirantesUisPersonalAdmitidos,
  getAspirantesExtPersonalAdmitidos,
  cambiarEstadoInscripcionById
}