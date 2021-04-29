const errorUtils = require("./../shared/error.shared")

const model = require("./../models/aspUisPersonal.models")
const modelUsuario = require("./../models/usuarios.models")

const validator = require('./../validators/aspUisPersonal.validator')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateAspUisPersonal = async (req, res, next) => {
  try {
    const id = req.params['_id']
    if (!id) validator.validateAspUisPersonal(req.body)
    validator.transformObjectId(req.body)
    const aspUisPersonal = await model.saveOrUpdateAspUisPersonal(id, req.body)
    const usuario = await modelUsuario.saveOrUpdateUsuario(req.body.correo, {
      correo: req.body.correo,
      contrasena: req.body.documento_id, rol: 2
    })

    res.send({model: aspUisPersonal, status: true})
  } catch (e) {
    console.log(e);
  }
}

const getAspiranteUisPersonal = async (req, res, next) => {
  try {
    const aspUisPersonal = await model.getAspiranteUisPersonal()
    res.send(aspUisPersonal)
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}


const getAspUisPersonalById = async (req, res, next) => {
  try {
    //const aspUisPersonalId = req.params._id
    const aspUisPersonalId = req.params['_id']
    const aspUisPersonal = await model.getAspUisPersonalById(aspUisPersonalId)
    res.send(aspUisPersonal)
  } catch (e) {
    res.send(res, e)
  }
}

const getAspirantesUisPersonal = async (req, res, next) => {
  try {
    const aspUisPersonal = await model.getAspirantesUisPersonal()
    
    res.send({estudiantes: aspUisPersonal, status: true})
  } catch (e) {
    errorUtils.sendErrorResponse(res, e)
  }
}

const consultarEstudiantes = async (req, res, next) => {
  try {

    const aspUisPersonal = await model.consultarEstudiantes(req.body)
    res.send(aspUisPersonal)
  } catch (e) {
    console.log(e);
  }
}


module.exports = {
  saveOrUpdateAspUisPersonal,
  getAspiranteUisPersonal,
  getAspUisPersonalById,
  getAspirantesUisPersonal,
  consultarEstudiantes,


}