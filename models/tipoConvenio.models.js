const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateTipoConvenio  = async (tipoConvenioId, tipoConvenioBody) => {
  const connection = await mongoConnector
  delete tipoConvenioBody._id
  const tipoConvenio = await connection.collection('tipoConvenio').findOneAndUpdate({
    _id: new ObjectId(tipoConvenioId)
  }, {
    $set:tipoConvenioBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return tipoConvenio.value
}

const getTipoConvenio = async ()=> {
  const connection = await mongoConnector
 
  const tipoConvenio = await connection.collection('tipoConvenio').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return tipoConvenio
}

module.exports = {
    saveOrUpdateTipoConvenio,
    getTipoConvenio
}