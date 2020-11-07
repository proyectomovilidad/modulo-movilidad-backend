const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateCargaDocumentos  = async (cargaDocumentosId, cargaDocumentosBody) => {
  const connection = await mongoConnector
  delete cargaDocumentosBody._id
  const cargaDocumentos = await connection.collection('cargaDocumentos').findOneAndUpdate({
    _id: new ObjectId(cargaDocumentosId)
  }, {
    $set:cargaDocumentosBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return cargaDocumentos.value
}


const getCargaDocumentosByNumeroInscripcion = async (numeroInscripcionId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        nro_inscripcion: new ObjectId(numeroInscripcionId)
      }
    }
  ]
  const cargaDocumentos = await connection.collection('cargaDocumentos').aggregate(aggregate).toArray()
  return cargaDocumentos
}

module.exports = {
    saveOrUpdateCargaDocumentos,
    getCargaDocumentosByNumeroInscripcion
    
}