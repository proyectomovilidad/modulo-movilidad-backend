const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateAspUisAcademic  = async (aspUisAcademicId, aspUisAcademicBody) => {
  const connection = await mongoConnector
  delete aspUisAcademicBody._id
  const aspUisAcademic = await connection.collection('aspUisAcademic').findOneAndUpdate({
    _id: new ObjectId(aspUisAcademicId)
  }, {
    $set: aspUisAcademicBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return aspUisAcademic.value
}


const getAspUisAcademic = async ()=> {
  const connection = await mongoConnector
 
  const aspUisAcademic = await connection.collection('aspUisAcademic').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return aspUisAcademic
}


const getAspUisAcademicById = async (Id)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(Id)
      }
    }
  ]
  const aspUisAcademic = await connection.collection('aspUisAcademic').aggregate(aggregate).toArray()
  return aspUisAcademic
}

const getAspUisAcademicByProgramaAcademico = async (programaAcademicoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        programa_acad: new ObjectId(programaAcademicoId)
      }
    }
  ]
  const aspUisAcademic = await connection.collection('aspUisAcademic').aggregate(aggregate).toArray()
  return aspUisAcademic
}

const getAspUisAcademicByPeriodoAcademico = async (periodoAcademicoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        periodo_inscrip: new ObjectId(periodoAcademicoId)
      }
    }
  ]
  const aspUisAcademic = await connection.collection('aspUisAcademic').aggregate(aggregate).toArray()
  return aspUisAcademic
}

const getAspUisAcademicByCodigo = async (codigo)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        codigo_est:  String(codigo)
      }
    }
  ]
  const aspUisAcademic = await connection.collection('aspUisAcademic').aggregate(aggregate).toArray()
  return aspUisAcademic
}

const getAspUisAcademicByAnoInscripcion = async (anoInscripcion)=> {
  const connection = await mongoConnector
  let aggregate = [  
    {
      $match: {
        ano_inscrip: String (anoInscripcion)
      }
    }
  ]
  const aspUisAcademic = await connection.collection('aspUisAcademic').aggregate(aggregate).toArray()
  return aspUisAcademic
}


module.exports = {
  saveOrUpdateAspUisAcademic ,
  getAspUisAcademicByProgramaAcademico,
  getAspUisAcademic,
  getAspUisAcademicById,
  getAspUisAcademicByCodigo,
  getAspUisAcademicByPeriodoAcademico,
  getAspUisAcademicByAnoInscripcion
}