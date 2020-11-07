 
 const { ObjectId } = require('mongodb')
 const mongoConnector = require('../bd/mongo.db')
 
 
 const saveOrUpdateApoyo  = async (apoyoId, apoyoBody) => {
   const connection = await mongoConnector
   delete apoyoBody._id
   const apoyo= await connection.collection('tipoApoyo').findOneAndUpdate({
     _id: new ObjectId(apoyoId)
   }, {
     $set:apoyoBody
   }, {
     upsert: true,
     returnOriginal: false
   })
   return apoyo.value
 }
 
 const getApoyo = async ()=> {
   const connection = await mongoConnector
  
   const apoyo = await connection.collection('tipoApoyo').find({}).toArray() // Devuelve la respuesta como un array de objetos
   return apoyo
 }
 
 module.exports = {
    saveOrUpdateApoyo,
    getApoyo
 }