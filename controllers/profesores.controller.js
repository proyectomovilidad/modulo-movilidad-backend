const model = require("./../models/profesores.models")
const modelUsuario = require("./../models/usuarios.models")
const validator = require('./../validators/profesores.validators')


/**
ROLES:
1: Administrador, 2: Estudiante Uis, 3: Estudiante externo, 4: profesores , 5: profesionalRELEXT
 */
const saveOrUpdateProfesores= async (req, res, next) => {
    try {
      console.log("profeor", req.url)

        const id = req.params['_id']
        if (!id) validator.validateProfesores(req.body)
        validator.transformObjectId(req.body)
       const profesores = await model.saveOrUpdateProfesores(id, req.body)
       const usuario = await modelUsuario.saveOrUpdateUsuario(req.body.correo, {correo: req.body.correo,
        contrasena: req.body.documento_id, rol: 4}) 
      
        res.send(profesores)
      } catch (e) {
        console.log(e);
      }
}

const getProfesores = async (req, res, next) => {
  try { 
      const profesores = await model.getProfesores()
      res.send(profesores)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getProfesoresById = async (req, res, next) => {
  try { 
    const profesoresId = req.params['_id']
      const profesores = await model.getProfesoresById(profesoresId)
      res.send(profesores)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getProfesoresByDocumentoId = async (req, res, next) => {
  try { 
    const documentoId = req.params['_id']
      const profesores = await model.getProfesoresByDocumentoId(documentoId)
      res.send(profesores)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const deleteProfesor  = async (req, res, next) =>{
  try { 
    const id = req.params['_id']
     const profesor = await model.deleteProfesor(id)
     
      res.send(profesor)
    } catch (e) {
     // errorUtils.sendErrorResponse(res, e)
     console.log(e)
     res.send(profesor)

    }
}

const getProfesoresConsulta = async (req, res, next) => {
  try { 
      const profesor = await model.getProfesoresConsulta()
      res.send(profesor)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const consultarProfesores = async (req, res, next) => {
  try {
      
     const profesores = await model.consultarProfesores(req.body)

      res.send(profesores)
    } catch (e) {
      console.log(e);
    }
} 




module.exports = {
    saveOrUpdateProfesores,
    getProfesores,
    getProfesoresById,
    getProfesoresByDocumentoId,
    deleteProfesor,
    getProfesoresConsulta,
    consultarProfesores
   
}