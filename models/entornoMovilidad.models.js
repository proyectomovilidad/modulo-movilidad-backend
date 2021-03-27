const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateFechasMovSaliente  = async (movilidadSalienteId, movilidadSalienteBody) => {
  const connection = await mongoConnector
  delete movilidadSaliente._id
  const movilidadSaliente= await connection.collection('entornoMovilidad').findOneAndUpdate({
    _id: new ObjectId(movilidadSalienteId)
  }, {
    $set:movilidadSalienteBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return movilidadSaliente.value
} 

const saveOrUpdateFechasMovEntrante  = async (movilidadEntranteId, movilidadEntranteBody) => {
    const connection = await mongoConnector
    delete movilidadEntrante._id
    const movilidadEntrante= await connection.collection('entornoMovilidad').findOneAndUpdate({
      _id: new ObjectId(movilidadEntranteId)
    }, {
      $set:movilidadEntranteBody
    }, {
      upsert: true,
      returnOriginal: false
    })
    return movilidadEntrante.value
  } 
 


module.exports = {
    saveOrUpdateFechasMovSaliente,
    saveOrUpdateFechasMovEntrante
    
}