
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
      const usuario = await connection.collection('usuarios').deleteOne({ correo: correo })
  
      if (usuario.deletedCount === 1) {
        return { status: true };
      } else {
        return { status: false };
      }
    }
    catch (e) {
      return { message: e.toString(), status: false };
    }
}

const deleteUsuarioById = async (_id) => {
  const connection = await mongoConnector

  try {
    const usuario = await connection.collection('usuarios').deleteOne({ _id: new ObjectId(_id) })

    if (usuario.deletedCount === 1) {
      return { status: true };
    } else {
      return { status: false };
    }
  }
  catch (e) {
    return { message: e.toString(), status: false };
  }
}

 const transformarConsulta = (consulta) => {

   let nuevaConsulta = {}
   for (let c in consulta) {

     if (consulta[c]) {
       if (c.includes("._id")) {
         nuevaConsulta[`${c}`] = ObjectId(consulta[c]);
       }
       else if (c.includes('rol')) {
         nuevaConsulta[`${c}`] = Number(consulta[c]);
       }
       else {
         nuevaConsulta[`${c}`] = consulta[c];
       }
     }
   }
   return nuevaConsulta
 }

const consultar = async (consulta) => {
  const connection = await mongoConnector

  const usuarios = await connection.collection('usuarios').find(transformarConsulta(consulta)).toArray();

  return usuarios;
}

 const getUsuarioById = async (id) => {
   const connection = await mongoConnector

   const usuario = await connection.collection('usuarios').find({_id: new ObjectId(id)}).toArray();

   return usuario[0];
 }

const getAllUsuarios = async () => {
  const connection = await mongoConnector

  const usuarios = await connection.collection('usuarios').find().toArray();

  return usuarios;
}
 
module.exports = {

    saveOrUpdateUsuario,
    getValidarAspirantes,
    getUsuarioByCorreo,
    deleteUsuario,
    deleteUsuarioById,
    consultar,
    getAllUsuarios,
  getUsuarioById
}
