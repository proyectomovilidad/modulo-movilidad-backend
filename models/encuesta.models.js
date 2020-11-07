const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateEncuesta = async (encuestaId, encuestaBody) => {
  const connection = await mongoConnector
  delete encuestaBody._id
  const encuesta = await connection.collection('encuesta').findOneAndUpdate({
    _id: new ObjectId(encuestaId)
  }, {
    $set:encuestaBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return encuesta.value
}


const getEncuesta = async ()=> {
  const connection = await mongoConnector
 
  const encuesta = await connection.collection('encuesta').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return encuesta
}

const getEncuestaByTipo = async (tipoEncuestaId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        tipo_encuesta: new ObjectId(tipoEncuestaId)
      }
    }
  ]
  const encuesta  = await connection.collection('encuesta').aggregate(aggregate).toArray()
  return encuesta
}




module.exports = {
    saveOrUpdateEncuesta,
    getEncuesta,
    getEncuestaByTipo
}