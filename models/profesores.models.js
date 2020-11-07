const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateProfesores = async (profesoresId, profesoresBody) => {
  const connection = await mongoConnector
  delete profesoresBody._id
  const profesores = await connection.collection('profesores').findOneAndUpdate({
    _id: new ObjectId(profesoresId)
  }, {
    $set:profesoresBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return profesores.value
}

const getProfesores = async ()=> {
  const connection = await mongoConnector
 
  const profesores = await connection.collection('profesores').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return profesores
}

const getProfesoresById = async (profesoresId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(profesoresId)
      }
    }
  ]
  const profesores  = await connection.collection('profesores').aggregate(aggregate).toArray()
  return profesores
}

const getProfesoresByDocumentoId = async (documentoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        documento_id: new ObjectId(documentoId)
      }
    }
  ]
  const profesores  = await connection.collection('profesores').aggregate(aggregate).toArray()
  return profesores
}

module.exports = {
    saveOrUpdateProfesores,
    getProfesores,
    getProfesoresById,
    getProfesoresByDocumentoId
    
}