const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateAspUisPersonal  = async (aspUisPersonalId, aspUisPersonalBody) => {
  const connection = await mongoConnector
  delete aspUisPersonalBody._id
  const aspUisPersonal = await connection.collection('aspUisPersonal').findOneAndUpdate({
    _id: new ObjectId(aspUisPersonalId)
  }, {
    $set: aspUisPersonalBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return aspUisPersonal.value
}

const getAspiranteUisPersonal = async ()=> {
  const connection = await mongoConnector
 
  const aspUisPersonal = await connection.collection('aspUisPersonal').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return aspUisPersonal
}

const getAspUisPersonalById = async (Id)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(Id)
      }
    }
  ]
  const aspUisPersonal = await connection.collection('aspUisPersonal').aggregate(aggregate).toArray()
  return aspUisPersonal
}



module.exports = {
  saveOrUpdateAspUisPersonal , 
  getAspiranteUisPersonal,
  getAspUisPersonalById
}