
 const { ObjectId } = require('mongodb')
 const mongoConnector = require('../bd/mongo.db')

 
const saveOrUpdateUsuario = async (usuarioCorreo, usuarioBody) => {
    const connection = await mongoConnector
    delete usuarioBody._id
    const valid = await getValidarAspirantes(usuarioBody.correo)
    if ((valid === 0 && !usuarioCorreo) || (usuarioCorreo)) {
  
      const usuario = await connection.collection('usuarios').findOneAndUpdate({
        correo: usuarioCorreo
      }, {
        $set: usuarioBody
      }, {
        upsert: true,
        returnOriginal: false
      })
      return usuario.value
    }
    return { status: false }
  }
  
  
  const getValidarAspirantes = async (correo) => {
    const connection = await mongoConnector
    const usuario = await connection.collection('usuarios').find({ correo: correo }).count()
    return usuario
  }
  
  const getUsuarioByCorreo = async (correo) => {
    const connection = await mongoConnector
    let aggregate = [  // Array de objetos
      {
        $match: { correo: correo
        }
    }   
     
    ]
    const usuario = await connection.collection('usuarios').aggregate(aggregate).toArray()
    return usuario
  }
  
  const deleteUsuario = async (correo) => {
    const connection = await mongoConnector
    try {
      const usuario = await connection.collection('usuarios').findOneAndDelete({ correo: correo })
  
      if (usaurio.ok === 1) {
        return { message: "El documento fue eliminado", status: true };
      } else {
        return { message: "El documento no ha sido eliminado", status: false };
  
      }
    }
    catch (e) {
      return { message: e, status: false };
    }
  }
  
 

 
module.exports = {

    saveOrUpdateUsuario,
    getValidarAspirantes,
    getUsuarioByCorreo,
    deleteUsuario
}