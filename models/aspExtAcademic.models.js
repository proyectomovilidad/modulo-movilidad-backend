const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateAspExtAcademic = async (aspExtAcademicId, aspExtAcademicBody) => {
  const connection = await mongoConnector
  delete aspExtAcademicBody._id
  const valid = await getValidarAspirantes(aspExtAcademicBody.documento_id)
  console.log(valid)
  if ((valid === 0 && !aspExtAcademicId) || (aspExtAcademicId)) {
    if ((valid === 0 && !aspExtAcademicId)) {aspExtAcademicBody.estado= "1"; } 
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
  return {}
}

const getValidarAspirantes = async (documento_id) => {
  const connection = await mongoConnector
  const aspExtAcademic = await connection.collection('aspExtAcademic').find({ documento_id: documento_id }).count()
  return aspExtAcademic

}


const getAspExtAcademic = async () => {
  const connection = await mongoConnector

  const aspExtAcademic = await connection.collection('aspExtAcademic').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return aspExtAcademic
}

const getAspExtAcademicById = async (Id) => {
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


const getAspExtAcademicByAnoInscripcion = async (anoInscripcion) => {
  const connection = await mongoConnector
  let aggregate = [
    {
      $match: {
        ano_inscrip: String(anoInscripcion)
      }
    }
  ]
  const aspExtAcademic = await connection.collection('aspExtAcademic').aggregate(aggregate).toArray()
  return aspExtAcademic
}

const getAspExtAcademicByPeriodoAcademico = async (periodoAcademicoId) => {
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

const getAspExtAcademicByInstitucionCooperante = async (institucionCooperanteId) => {
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

const getAspExtAcademicByProgramaAcademicoUis = async (programaAcademicoId) => {
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

const getAspExtAcademicByEstado = async (documento_id)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        documento_id:  String(documento_id), estado: "1"

      }
    }
  ]
  const aspExtAcademic = await connection.collection('aspExtAcademic').aggregate(aggregate).toArray()
  return aspExtAcademic
}

const deleteAspExtAcademicById = async (_id) => {
  const connection = await mongoConnector
  try {
    const aspExtAcademic = await connection.collection('aspExtAcademic').findOneAndDelete({ documento_id: _id })

    if (aspExtAcademic.ok === 1) {
      return { message: "El documento fue eliminado", status: true };
    } else {
      return { message: "El documento no ha sido eliminado", status: false };

    }
  }
  catch (e) {
    return { message: e, status: false };
  }

}



module.exports = {
  saveOrUpdateAspExtAcademic,
  getAspExtAcademic,
  getAspExtAcademicById,
  getAspExtAcademicByInstitucionCooperante,
  getAspExtAcademicByAnoInscripcion,
  getAspExtAcademicByPeriodoAcademico,
  getAspExtAcademicByProgramaAcademicoUis,
  deleteAspExtAcademicById,
  getAspExtAcademicByEstado
}

