 
 const { ObjectId } = require('mongodb')
 const mongoConnector = require('../bd/mongo.db')
 
 
 const saveOrUpdateDepartamento  = async (departamentoId, departamentoBody) => {
   const connection = await mongoConnector
   delete departamentoBody._id
   const departamento= await connection.collection('departamento').findOneAndUpdate({
     _id: new ObjectId(departamentoId)
   }, {
     $set:departamentoBody
   }, {
     upsert: true,
     returnOriginal: false
   })
   return departamento.value
 }
  
 const getDepartamentos = async (codigo_pais)=> {
   const connection = await mongoConnector
  
   const departamentos = await connection.collection('departamento').find({ codigo_pais }).toArray() // Devuelve la respuesta como un array de objetos
   return departamentos
 }
 
 const getAllDepartamentos = async ()=> {
   const connection = await mongoConnector
  
   const departamentos = await connection.collection('departamento').find({}).toArray() // Devuelve la respuesta como un array de objetos
   return departamentos
 }
 module.exports = {
    saveOrUpdateDepartamento,
    getDepartamentos,
    getAllDepartamentos
 }