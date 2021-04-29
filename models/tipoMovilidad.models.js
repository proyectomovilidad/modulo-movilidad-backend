  
 const { ObjectId } = require('mongodb')
 const mongoConnector = require('../bd/mongo.db')
 
 
 const saveOrUpdateTipoMovilidad  = async (tipoMovilidadId, tipoMovilidadBody) => {
   const connection = await mongoConnector
   delete tipoMovilidadBody._id
   const tipoMovilidad= await connection.collection('tipoMovilidad').findOneAndUpdate({
     _id: new ObjectId(tipoMovilidadId)
   }, {
     $set:tipoMovilidadBody
   }, {
     upsert: true,
     returnOriginal: false
   })
   return tipoMovilidad.value
 }
 
 const getTipoMovilidad = async ()=> {
   const connection = await mongoConnector
  
   const tipoMovilidad = await connection.collection('tipoMovilidad').find({}).toArray() // Devuelve la respuesta como un array de objetos
   return tipoMovilidad
 }

 const getMovilidadById = async (movilidadId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(movilidadId)
      }
    }
  ]
  const movilidad  = await connection.collection('tipoMovilidad').aggregate(aggregate)
  return movilidad
}

const getTipoMovilidadByInstProgAcad = async (instId, progAcadId)=>{
  const connection = await mongoConnector
  const aggregate = [
    {
      $project: {
        'tipoMovilidad': '$$ROOT'
      }
    },
    {
      $lookup: {
        from: 'convenio',
        localField: 'tipoMovilidad._id',
        foreignField: 'tipo_movilidad',
        as: 'Convenios'
      }
    },
    {
      $match: {
        'Convenios.nombre_institucion': new ObjectId(instId),
        'Convenios.programa_acad': new ObjectId(progAcadId),
        'Convenios.estado_convenio': 'activo'        
      }
    }
  ]
  const tipoMovilidades = await connection.collection('tipoMovilidad').aggregate(aggregate).toArray()
  return tipoMovilidades
}
 
 module.exports = {
    saveOrUpdateTipoMovilidad,
    getTipoMovilidadByInstProgAcad,
    getTipoMovilidad,
    getMovilidadById
 }