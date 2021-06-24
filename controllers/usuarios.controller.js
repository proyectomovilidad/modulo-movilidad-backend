const model = require("./../models/usuarios.models")
const validator = require('./../validators/usuarios.validators')

const saveUsuario = async ( req, res, next) => {
  try {
    const datos = req.body;
    validator.validateUsuario(datos)
    datos.rol = Number(datos.rol)

    const usuario = await model.saveOrUpdateUsuario(datos.correo, datos);
    res.send({ status: true, data: usuario })
  } catch (e) {
    res.send({ status: false, error: true, message: e.toString() })
  }
}

const updateUsuario = async ( req, res, next) => {
  try {
    const correo = req.params['correo']
    const usuario = await model.saveOrUpdateUsuario(req.body);
    res.send({ status: true, data: usuario })
  } catch (e) {
    res.send({ status: false, error: true, message: e.toString() })
  }
}

const getAllUsuarios = async ( req, res, next ) => {
  try {
    const usuarios = await model.getAllUsuarios();
    res.send({ status: true, data: usuarios})
  } catch (e) {
    res.send({ status: true, error: true, message: e.toString() })
  }
}

const getUsuarioById = async ( req, res, next ) => {
  try {
    const id = req.params['_id']
    const usuario = await model.getUsuarioById(id);
    res.send({ status: true, data: usuario})
  } catch (e) {
    res.send({ status: true, error: true, message: e.toString() })
  }
}

const deleteUsuario = async ( req, res, next ) => {
  try {
    const id = req.params['_id']
    const usuario = await model.deleteUsuarioById(id)

    res.send({ status: true, data: usuario})
  } catch (e) {
    res.send({ status: true, error: true, message: e.toString() })
  }
}

const consultarUsuario = async ( req, res, next ) => {
  try {
    const usuarios = await model.consultar(req.body);

    res.send({ status: true, data: usuarios })
  }catch (e) {
    res.send({ status: true, error: true, message: e.toString()})
  }
}

module.exports = {
  saveUsuario,
  updateUsuario,
  getAllUsuarios,
  deleteUsuario,
  consultarUsuario,
  getUsuarioById
}
