 
 const { ObjectId } = require('mongodb')
 const mongoConnector = require('../bd/mongo.db')
 
 
 const saveOrUpdateEntidadFinanciera  = async (entidadFinancieraId, entidadFinancieraBody) => {
   const connection = await mongoConnector
   delete entidadFinancieraBody._id
   const entidadFinanciera= await connection.collection('entidadFinanciera').findOneAndUpdate({
     _id: new ObjectId(entidadFinancieraId)
   }, {
     $set:entidadFinancieraBody
   }, {
     upsert: true,
     returnOriginal: false
   })
   return entidadFinanciera.value
 }
 
 const getEntidadFinanciera = async ()=> {
   const connection = await mongoConnector
  
   const entidadFinanciera = await connection.collection('entidadFinanciera').find({}).toArray() // Devuelve la respuesta como un array de objetos
   return entidadFinanciera
 }
 
 module.exports = {
    saveOrUpdateEntidadFinanciera,
    getEntidadFinanciera
 }