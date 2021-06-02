const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateConvocatoria  = async (convocatoriaId, convocatoriaBody) => {
  const connection = await mongoConnector
  delete convocatoriaBody._id
  const convocatoria = await connection.collection('convocatoria').findOneAndUpdate({
    _id: new ObjectId(convocatoriaId)
  }, {
    $set:convocatoriaBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return convocatoria.value
}

const getConvocatorias = async ()=> {
  const connection = await mongoConnector
 
  const convocatorias = await connection.collection('convocatoria').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return convocatorias
}


const getConvocatoriaById = async (convocatoriaId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(convocatoriaId)
      }
    }
  ]
  const convocatoria = await connection.collection('convocatoria').aggregate(aggregate).toArray()
  return convocatoria
}

const deleteConvocatoria = async (_id) => {
  const connection = await mongoConnector
  try {
    const convocatoria = await connection.collection('convocatoria').findOneAndDelete({ _id: _id })

    if (convocatoria.ok === 1) {
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
    saveOrUpdateConvocatoria,
    getConvocatorias,
    getConvocatoriaById,
    deleteConvocatoria
    
}