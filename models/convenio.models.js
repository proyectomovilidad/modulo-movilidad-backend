const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateConvenio  = async (convenioId, convenioBody) => {
  const connection = await mongoConnector
  delete convenioBody._id
  const convenio = await connection.collection('convenio').findOneAndUpdate({
    _id: new ObjectId(convenioId)
  }, {
    $set:convenioBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return convenio.value
}

const getConvenio = async ()=> {
  const connection = await mongoConnector
 
  const convenio = await connection.collection('convenio').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return convenio
}


const getConvenioById = async (convenioId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(convenioId)
      }
    }
  ]
  const convenio = await connection.collection('convenio').aggregate(aggregate).toArray()
  return convenio
}

module.exports = {
    saveOrUpdateConvenio,
    getConvenio,
    getConvenioById
    
}