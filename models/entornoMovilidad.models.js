const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')

const saveOrUpdateFechasMovSaliente  = async (movilidadSalienteId, movilidadSalienteBody) => {
  const connection = await mongoConnector
  //delete movilidadSaliente._id
  const movilidadSaliente= await connection.collection('entornoMovilidad').findOneAndUpdate({
    _id: new ObjectId(movilidadSalienteId)
  }, {
    $set: movilidadSalienteBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return movilidadSaliente.value
}

const saveFechasMovilidad = async (fechasMovData) =>{
  const connection =  await mongoConnector
  const valid = await validateMov(fechasMovData);

  if(valid) return {message: 'not save'};
  const fechasMovilidad = await connection.collection('entornoMovilidad').insertOne(fechasMovData)

  return fechasMovilidad.ops
}

const updateFechasMovilidad = async (id, fechasMovData) =>{
  const connection = await mongoConnector
  const valid = await validateMov(fechasMovData)
  delete fechasMovData._id

  const fechasMovilidad = await connection.collection('entornoMovilidad').findOneAndUpdate(
    {
      _id: new ObjectId(id)
    }, 
    {
      $set: fechasMovData
    }, 
    {
      upsert: false,
      returnOriginal: false
  })

  return fechasMovilidad.value
}

const getFechasMovByStatus = async (fechasMovData) =>{
  const connection = await mongoConnector
  const fechasMovilidad = await connection.collection('entornoMovilidad').find({
    tipo: parseInt(fechasMovData.tipo),
    periodo: fechasMovData.periodo
  }).sort({periodo: -1}).toArray()
  
  return fechasMovilidad[0]
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

const getFechasMovEntrante = async ()=>{
  const connection = await mongoConnector
  const movilidadEntrante = await connection.collection('entornoMovilidad').find({}).sort({periodo: -1}).toArray()

  return movilidadEntrante
}

const validateMov = async (data) =>{
  const connection = await mongoConnector
  const movilidad = await connection.collection('entornoMovilidad').find({
    periodo: data.periodo,
    tipo: data.tipo
  }).toArray()

  return movilidad.length > 0
}

module.exports = {
    saveOrUpdateFechasMovSaliente,
    saveOrUpdateFechasMovEntrante,
    getFechasMovEntrante,
    saveFechasMovilidad,
    updateFechasMovilidad,
    getFechasMovByStatus
}