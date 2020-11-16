const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateCiudad  = async (ciudadId, ciudadBody) => {
  const connection = await mongoConnector
  delete ciudadBody._id
  const ciudad= await connection.collection('ciudad').findOneAndUpdate({
    _id: new ObjectId(ciudadId)
  }, {
    $set:ciudadBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return ciudad.value
} 
 
const getCiudades = async (codigo_departamento)=> {
  const connection = await mongoConnector
 
  const ciudades = await connection.collection('ciudad').find({ codigo_departamento }).toArray() // Devuelve la respuesta como un array de objetos
  return ciudades
}

module.exports = {
    saveOrUpdateCiudad,
    getCiudades
}