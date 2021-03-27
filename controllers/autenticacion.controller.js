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
        if (usuarios.lenght == 0) {
            return res.send({
                status: false, message: "El usuario no esta registrado en la base de datos"
            })
        }
        if (req.body.contrasena == usuarios[0].contrasena) {

            //const bcrypt = require('bcrypt')
            if (req.rol == "estudianteUis") {
                datos = modelAspUis.getAspUisPersonalByCorreo(req.body.usuario);
            }

            if (req.rol == "estudianteExt") {
                datos = modelAspExt.getAspExtPersonalByCorreo(req.body.usuario);
            }

            if (req.body.rol == "profesor") {
                const datos = await modelProfesores.getProfesorByCorreo(req.body.usuario);
                console.log("usuario", req.body.usuario)
                console.log("datos", datos._id)
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
            base: usuarios[0].contrasena
        })
    } catch (e) {
        console.log(e);
    }
}

// Método para validar que el usuario esta creado en cualquier ruta
const validacionUsuario = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.send({ message: "El usuario no tiene permiso" });  //Si realiza la petición sin una autorización

        const token = req.headers.authorization.split(' ')[1]
        decodificar(token).then(res => {
            next()
        }).catch(reject => {
            res.send(reject)
        })

    } catch (e) {
        res.send(e)
    }
}

const controlRutas = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        decodificar(token).then(res => {
            if (res.rol == 1) {
                return next()
            }

            if (validarRuta(req.method, req.url, req.baseUrl, res.payload)) {

                return next()
            }

            return  res.send({
                status: false,
                message: "Este rol no tiene permiso"
            })
        }).catch(reject => {
           return res.send(reject)
        })

    } catch (e) {
        return  res.send({
            status: false,
            message: e
        })
    }
}

const validarRuta = (metodo, url, baseUrl, usuario) => {
    if (metodo == "PUT") { //Editar
        if (eval(`permisos.r${usuario.rol}.${baseUrl.replace(new RegExp("/", "g"), "")}.permisos.includes('/')` && usuario._id == url.split("/")[1])) {
//  eval -> convierte un strign en un código ejecutable
            return true;
        }

    } else if (metodo == "POST") { // save
        if (eval(`permisos.r${usuario.rol}.${baseUrl.replace(new RegExp("/", "g"), "")}.permisos.includes('${url}')`)) {

            return true;

        }


    } else if (metodo == "GET") { // visualizar

        if (eval(`permisos.r${usuario.rol}.${baseUrl.replace(new RegExp("/", "g"), "")}.permisos.includes('/${url.split("/")[1]}/:_id')`)) {
            if (usuario._id == url.split("/")[2]) {
                return true;
            }

        } else if (eval(`permisos.r${usuario.rol}.${baseUrl.replace(new RegExp("/", "g"), "")}.permisos.includes('${url}')`)) {
            return true;
        }


    }
    return false


}

/*
Editar: put, visualizar: get, delete: eliminar, post: save
*/
const permisos = {
    "r1": [true],
    "r2": { "aspUisPersonal": { permisos: ["put", "get"] }, convenios: { permisos: ["visualizar", "consultar"] } },
    "r3": { "aspExtPersonal": { permisos: ["editar", "visualizar", "consultar"] } },
    "r4": { "profesores": { permisos: ["/", "/getProfesoresConsulta/", "/getProfesoresById/:_id"] }, "convocatorias": { permisos: ["consultar"] } }

}
module.exports = {
    inicioSesion,
    validacionUsuario,
    controlRutas

}