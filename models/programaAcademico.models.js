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

const getProgramaAcademicosByInstitucion = async(institucionId) =>{
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $project: {
        'programaAcademico': '$$ROOT'
      }
    },
    {
      $lookup: {
        from: 'convenio',
        localField: 'programaAcademico._id',
        foreignField: 'programa_acad',
        as: 'Convenios'
      }
    },
    {
      $match: {
        'Convenios.nombre_institucion': new ObjectId(institucionId),
        'Convenios.estado_convenio': 'activo'
      }
    }
  ]
  const programaAcademicos = await connection.collection('programaAcademico').aggregate(aggregate).toArray()
  console.log('programas: ',programaAcademicos)
  console.log('institucionID: ', institucionId)

  return programaAcademicos
}

module.exports = {
    saveOrUpdateProgramaAcademico,
    getProgramaAcademico,
    getProgramaAcademicosByInstitucion
}