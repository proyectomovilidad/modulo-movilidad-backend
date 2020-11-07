
const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdatePreguntas = async (preguntasId, preguntasBody) => {
  const connection = await mongoConnector
  delete preguntasBody._id
  const preguntas = await connection.collection('preguntas').findOneAndUpdate({
    _id: new ObjectId(preguntasId)
  }, {
    $set:preguntasBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return preguntas.value
}

const getPreguntas = async ()=> {
  const connection = await mongoConnector
 
  const preguntas = await connection.collection('preguntas').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return preguntas
}

const getPreguntasById = async (preguntasId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(preguntasId)
      }
    }
  ]
  const preguntas  = await connection.collection('preguntas').aggregate(aggregate).toArray()
  return preguntas
}

const getPreguntasByTipo = async (tipoPreguntaId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        tipo_pregunta: new ObjectId(tipoPreguntaId)
      }
    }
  ]
  const preguntas  = await connection.collection('preguntas').aggregate(aggregate).toArray()
  return preguntas
}


module.exports = {
    saveOrUpdatePreguntas,
    getPreguntas,
    getPreguntasById,
    getPreguntasByTipo
}



