const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateSolicitudPresentada = async (soliPresentadaId, soliPresentadaBody) => {
  const connection = await mongoConnector
  delete soliPresentadaBody._id
  const soliPresentada = await connection.collection('soliPresentada').findOneAndUpdate({
    _id: new ObjectId(soliPresentadaId)
  }, {
    $set:soliPresentadaBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return soliPresentada.value
}

const getSolicitudPresentada = async ()=> {
  const connection = await mongoConnector
 
  const solicitudPresentada = await connection.collection('soliPresentada').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return solicitudPresentada
}


const getSolicitudPresentadaByNumeroInscripcion = async (numeroInscripcionId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        nro_inscripcion: new ObjectId(numeroInscripcionId)
      }
    }
  ]
  const solicitudPresentada = await connection.collection('soliPresentada').aggregate(aggregate).toArray()
  return solicitudPresentada
}


const getSolicitudPresentadaByEstadoSolicitud = async (estadoSolicitudId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        estado_solicitud: new ObjectId(estadoSolicitudId)
      }
    }
  ]
  const solicitudPresentada = await connection.collection('soliPresentada').aggregate(aggregate).toArray()
  return solicitudPresentada
}

const getSolicitudPresentadaById = async (solicitudId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(solicitudId)
      }
    }
  ]
  const solicitudPresentada = await connection.collection('soliPresentada').aggregate(aggregate).toArray()
  return solicitudPresentada
}



module.exports = {
    saveOrUpdateSolicitudPresentada,
    getSolicitudPresentada,
    getSolicitudPresentadaByNumeroInscripcion,
    getSolicitudPresentadaByEstadoSolicitud,
    getSolicitudPresentadaById
}