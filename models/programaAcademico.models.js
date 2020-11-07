const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateProgramaAcademico  = async (programaAcademicoId, programaAcademicoBody) => {
  const connection = await mongoConnector
  delete programaAcademicoBody._id
  const programaAcademico = await connection.collection('programaAcademico').findOneAndUpdate({
    _id: new ObjectId(programaAcademicoId)
  }, {
    $set:programaAcademicoBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return programaAcademico.value
}

const getProgramaAcademico = async ()=> {
  const connection = await mongoConnector
 
  const programaAcademico = await connection.collection('programaAcademico').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return programaAcademico
}

module.exports = {
    saveOrUpdateProgramaAcademico,
    getProgramaAcademico
}