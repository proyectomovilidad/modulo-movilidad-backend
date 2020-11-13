const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateTipoDocumentoId  = async (tipoDocIdId, tipoDocIdBody) => {
  const connection = await mongoConnector
  delete tipoDocIdBody._id
  const tipodocumentoId= await connection.collection('tipoDocumentoId').findOneAndUpdate({
    _id: new ObjectId(tipoDocIdId)
  }, {
    $set:tipoDocIdBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return tipodocumentoId.value
}

const getTipoDocumentoId = async ()=> {
  const connection = await mongoConnector
 
  const tipodocumentoId = await connection.collection('tipoDocumentoId').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return tipodocumentoId
}

module.exports = {
    saveOrUpdateTipoDocumentoId,
    getTipoDocumentoId
}