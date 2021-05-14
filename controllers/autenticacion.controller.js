const modelUsuario = require("./../models/usuarios.models")
const modelProfesores = require("./../models/profesores.models")
const modelAspUis = require("./../models/aspUisPersonal.models")
const modelAspExt = require("./../models/aspExtPersonal.models")
const jwt = require('jwt-simple') // Realiza la importación del token
const moment = require('moment')
const { request } = require("express")
const Promise = require('es6-promise').Promise;


const secret = "clave"

//Codificar token
function crearToken(usuario, _id) {

    const payload = {
        correo: usuario.correo,
        limiteTiempo: moment().add(1, "days").unix(),
        fecha: moment().unix(),
        rol: usuario.rol,
        _id: _id
    }
    return jwt.encode(payload, secret) //Devuelve el payload encriptado

}

//Decoficar token para validar token enviado
function decodificar(token) {
    return new Promise((resolve, reject) => {
        try {
            let payload = jwt.decode(token, secret)
            if (payload.limiteTiempo <= moment().unix()) {
                reject({ message: "Su tiempo ha expirado", status: false })

            }
            resolve({ payload })

        } catch (error) {
            reject({ message: error, status: false })

        }

    })

}

const inicioSesion = async (req, res, next) => {
    try {
        const usuarios = await modelUsuario.getUsuarioByCorreo(req.body.usuario);

        if (usuarios.length == 0) {
            return res.send({
                status: false, message: "El usuario no esta registrado en la base de datos"
            })
        }

        if (req.body.contrasena == usuarios[0].contrasena) {
            
            //const bcrypt = require('bcrypt')
            if (req.body.rol == "estudianteUis") {
              let datos = await modelAspUis.getAspUisPersonalByCorreo(req.body.usuario);
              
              return res.send({
                  message: "Inicio de sesión correctamente",
                  status: true,
                  token: crearToken(usuarios[0], `${datos._id}`),
                  usuario: datos
              })
            }

            if (req.body.rol == "estudianteExt") {
              let datos = await  modelAspExt.getAspExtPersonalByCorreo(req.body.usuario);
              console.log('datos: ',datos)
              return res.send({
                  message: "Inicio de sesión correctamente",
                  status: true,
                  token: crearToken(usuarios[0], `${datos._id}`),
                  usuario: datos
              })
            }

            if (req.body.rol == "profesor") {
                let datos = await modelProfesores.getProfesorByCorreo(req.body.usuario);
              
              return res.send({
                  message: "Inicio de sesión correctamente",
                  status: true,
                  token: crearToken(usuarios[0], `${datos._id}`),
                  usuario: datos
              })
            }
            
            


        }
        res.send({
            status: false,
            message: "contraseña incorrecta",
            contrasena: req.body.contrasena,
            base: usuarios[0].contrasena,
            correo: usuarios[0].correo
        })
    } catch (e) {
        console.log(e);
    }
}

// Método para validar que el usuario esta creado en cualquier ruta
const validacionUsuario = async (req, res, next) => {
    try {

        if (!req.headers.authorization) return res.send({ message: "El usuario no tiene permiso", status: false });  //Si realiza la petición sin una autorización
        
        const token = req.headers.authorization.split(' ').pop()
        decodificar(token).then(res => {
            next()
        }).catch(reject => {
            res.send({message: reject, status: false})
        })

    } catch (e) {
        res.send({message: e.toString(), status: false})
    }
}

const controlRutas = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop()
    decodificar(token).then(resp => {
      if (resp.rol == 1) {
        return next()
      }

      if (validarRuta(req.method, req.url, req.baseUrl, resp.payload)) {
        return next()
      }

      return  res.send({
        status: false,
        message: "Este rol no tiene permiso",
        permiso: false
      })
    }).catch(reject => {
      return res.send({message: reject.toString(), satus: false})
    })

  } catch (e) {
    return  res.send({
      status: false,
      message: e.toString()
    })
  }
}

const validarRuta = (metodo, url, baseUrl, usuario) => {
  let permiso =  `permisos.r${usuario.rol}.${baseUrl.replace(new RegExp("/", "g"), "")}`
  
  if(!eval(`${permiso}`)){
    return false;
  }
  //  eval -> convierte un strign en un código ejecutable
  if(metodo == 'PUT'){ //update
    if (eval(`${permiso}.permisos.includes('/:_id')`) && usuario._id == url.split("/")[1]) {
      return true;
    }
  } 
  else if (metodo == "POST") { // save or update
    if (eval(`${permiso}.permisos.includes('/:_id')`) && usuario._id == url.split("/")[1]) {
      return true;
    }
    if (eval(`${permiso}.permisos.includes('${url}')`)) {
        return true;
    }
  } 
  else if (metodo == "GET") { // visualizar
    if (eval(`${permiso}.permisos.includes('/${url.split("/")[1]}/:_id')`)) {
      if (usuario._id == url.split("/")[2]) {
        return true;
      }
    } else if (eval(`${permiso}.permisos.includes('${url}')`)) {
      return true;
    }
  }
  return false
}

/*
Editar: put, visualizar: get, delete: eliminar, post: save
  admin: 1
  estudiante: 2
  estudianteexterno: 3
  profesor: 4
  profesionalRelExt:5
*/

const permisos = {
  "r1": [true],
  "r2": { 
    "aspUisPersonal": { permisos: ["/:id", '/'] },
    "aspUisAcademic": { permisos: ["/:id", '/'] },
    'cargaDocumentos': {permisos: ['/saveDocumentoFile/']},
    'inscripcion': {permisos: ['/']}
  },
  "r3": { 
    "aspExtPersonal": { permisos: ["/:id",'/'] },
    "aspExtAcademic": { permisos: ["/:id",'/'] },
    'cargaDocumentos': {permisos: ['/saveDocumentoFile/']},
    'inscripcion': {permisos: ['/']}
  },
  "r4": { 
    "profesores": { 
      permisos: ["/",'/getProfesores/', "/getProfesoresConsulta/", "/getProfesoresById/:_id",
        '/getProfesoresByDocumentoId/:_id', '/consultarProfesores/'
      ] 
    },
    "convocatorias": { permisos: ["/getConvocatorias/", "/getConvocatoriaById/:_id"] } 
  },
  "r5": {
    'cargaDocumentos': {
      permisos: ['/getDocumentosByNombre/:fileName', '/', '/eliminarDocumentoByNombre/:fileName']
    },
    'entornoMovilidad': {permisos: ['/','/:_id', '/getFechas/', '/getFechasByStatus/']} ,
    'aspExtAcademic': {permisos:[ '/:_id',
      '/getAspiranteExtAcademic/', '/getAspExtAcademicById/:_id', '/getAspExtAcademicByInstitucionCooperanteId/:_id',
      '/getAspExtAcademicByAnoInscripcion/:_id', '/getAspExtAcademicByPeriodoAcademicoById/:_id',
      '/getAspExtAcademicByProgramaAcademicoUisById/:_id', '/deleteAspiranteExtAcademicById/:_id'
    ]}   
  }


}
module.exports = {
    inicioSesion,
    validacionUsuario,
    controlRutas

}