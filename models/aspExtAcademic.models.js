const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateAspExtAcademic  = async (aspExtAcademicId, aspExtAcademicBody) => {
  const connection = await mongoConnector
  delete aspExtAcademicBody._id
  const aspExtAcademic = await connection.collection('aspExtAcademic').findOneAndUpdate({
    _id: new ObjectId(aspExtAcademicId)
  }, {
    $set: aspExtAcademicBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return aspExtAcademic.value
}


const getAspExtAcademic= async ()=> {
  const connection = await mongoConnector
 
  const aspExtAcademic = await connection.collection('aspExtAcademic').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return aspExtAcademic
}

const getAspExtAcademicById = async (Id)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(Id)
      }
    }
  ]
  const aspExtAcademic = await connection.collection('aspExtAcademic').aggregate(aggregate).toArray()
  return aspExtAcademic
}


const getAspExtAcademicByAnoInscripcion = async (anoInscripcion)=> {
  const connection = await mongoConnector
  let aggregate = [  
    {
      $match: {
        ano_inscrip: String (anoInscripcion)
      }
    }
  ]
  const aspExtAcademic = await connection.collection('aspExtAcademic').aggregate(aggregate).toArray()
  return aspExtAcademic
}

const getAspExtAcademicByPeriodoAcademico = async (periodoAcademicoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        periodo_inscrip: new ObjectId(periodoAcademicoId)
      }
    }
  ]
  const aspExtAcademic = await connection.collection('aspExtAcademic').aggregate(aggregate).toArray()
  return aspExtAcademic
}

const getAspExtAcademicByInstitucionCooperante = async (institucionCooperanteId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        nombre_institucion: new ObjectId(institucionCooperanteId)
      }
    }
  ]
  const aspExtAcademic = await connection.collection('aspExtAcademic').aggregate(aggregate).toArray()
  return aspExtAcademic
}

const getAspExtAcademicByProgramaAcademicoUis = async (programaAcademicoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        prog_acad_uis: new ObjectId(programaAcademicoId)
      }
    }
  ]
  const aspExtAcademic = await connection.collection('aspExtAcademic').aggregate(aggregate).toArray()
  return aspExtAcademic
}




module.exports = {
  saveOrUpdateAspExtAcademic, 
  getAspExtAcademic,
  getAspExtAcademicById,
  getAspExtAcademicByInstitucionCooperante,
  getAspExtAcademicByAnoInscripcion,
  getAspExtAcademicByPeriodoAcademico,
  getAspExtAcademicByProgramaAcademicoUis
}

