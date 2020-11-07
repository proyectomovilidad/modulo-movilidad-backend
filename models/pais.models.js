const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdatePais  = async (paisId, paisBody) => {
  const connection = await mongoConnector
  delete paisBody._id
  const pais= await connection.collection('pais').findOneAndUpdate({
    _id: new ObjectId(paisId)
  }, {
    $set:paisBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return pais.value
}

const getPais = async ()=> {
  const connection = await mongoConnector
 
  const pais = await connection.collection('pais').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return pais
}

module.exports = {
    saveOrUpdatePais,
    getPais
}