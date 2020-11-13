  
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
 
 module.exports = {
    saveOrUpdateTipoMovilidad,
    getTipoMovilidad
 }