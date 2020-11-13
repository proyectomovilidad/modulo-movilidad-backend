
 const { ObjectId } = require('mongodb')
 const mongoConnector = require('../bd/mongo.db')
 
 
 const saveOrUpdateDocumento  = async (documentoId, documentoBody) => {
   const connection = await mongoConnector
   delete documentoBody._id
   const documento= await connection.collection('tipoDocumento').findOneAndUpdate({
     _id: new ObjectId(documentoId)
   }, {
     $set:documentoBody
   }, {
     upsert: true,
     returnOriginal: false
   })
   return documento.value
 }
 
 const getDocumento = async ()=> {
   const connection = await mongoConnector
  
   const documento = await connection.collection('tipoDocumento').find({}).toArray() // Devuelve la respuesta como un array de objetos
   return documento
 }
 
 module.exports = {
    saveOrUpdateDocumento,
    getDocumento
 }