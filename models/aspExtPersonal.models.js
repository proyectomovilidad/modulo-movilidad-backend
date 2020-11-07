const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateAspExtPersonal  = async (aspExtPersonalId, aspExtPersonalBody) => {
  const connection = await mongoConnector
  delete aspExtPersonalBody._id
  const aspExtPersonal = await connection.collection('aspExtPersonal').findOneAndUpdate({
    _id: new ObjectId(aspExtPersonalId)
  }, {
    $set: aspExtPersonalBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return aspExtPersonal.value
}


const getAspExtPersonal= async ()=> {
  const connection = await mongoConnector
 
  const aspExtPersonal = await connection.collection('aspExtPersonal').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return aspExtPersonal
}

const getAspExtPersonalById = async (Id)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(Id)
      }
    }
  ]
  const aspExtPersonal = await connection.collection('aspExtPersonal').aggregate(aggregate).toArray()
  return aspExtPersonal
}

const getAspExtPersonalByDocumentoId = async (documentoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        documento_id: String (documentoId)
      }
    }
  ]
  const aspExtPersonal = await connection.collection('aspExtPersonal').aggregate(aggregate).toArray()
  return aspExtPersonal
}


module.exports = {
  saveOrUpdateAspExtPersonal ,
  getAspExtPersonal,
  getAspExtPersonalById,
  getAspExtPersonalByDocumentoId
}