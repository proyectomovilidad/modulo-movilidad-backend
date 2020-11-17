
 const { ObjectId } = require('mongodb')
 const mongoConnector = require('../bd/mongo.db')
 
 
 const saveOrUpdateTipoProyecto  = async (tipoProyectoId, tipoProyectoBody) => {
   const connection = await mongoConnector
   delete tipoProyectoBody._id
   const tiposProyecto= await connection.collection('tipoProyecto').findOneAndUpdate({
     _id: new ObjectId(tipoProyectoId)
   }, {
     $set:tipoProyectoBody
   }, {
     upsert: true,
     returnOriginal: false
   })
   return tiposProyecto.value
 }
 
 const getTiposProyecto = async ()=> {
   const connection = await mongoConnector
  
   const tiposProyecto = await connection.collection('tipoProyecto').find({}).toArray() // Devuelve la respuesta como un array de objetos
   return tiposProyecto
 }
 
 module.exports = {
    saveOrUpdateTipoProyecto,
    getTiposProyecto
 }