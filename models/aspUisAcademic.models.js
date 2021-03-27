const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateAspUisAcademic  = async (aspUisAcademicId, aspUisAcademicBody) => {
  const connection = await mongoConnector
  delete aspUisAcademicBody._id
  const valid = await getValidarAspirantes(aspUisAcademicBody.codigo_est)
  console.log(valid)
  if ((valid === 0 && !aspUisAcademicId) || (aspUisAcademicId)) {
    if ((valid === 0 && !aspUisAcademicId)) {aspUisAcademicBody.estado= "1"; } 
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
 return {}
}

const getValidarAspirantes = async (codigo_est) => { // Validar cuantos aspirantes hay con el mismo código de estudiante
  const connection = await mongoConnector
  const aspUisAcademic = await connection.collection('aspUisAcademic').find({codigo_est: codigo_est, estado: "1"}).count() 
return aspUisAcademic

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

const getAspUisAcademicByEstado = async (codigo)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        codigo_est:  String(codigo), estado : "1"

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


const deleteAspUisAcademic = async (_id) => {
  const connection = await mongoConnector
try {
  const aspUisAcademic = await connection.collection('aspUisAcademic').findOneAndDelete({codigo_est:_id})
  
  if (aspUisAcademic.ok === 1) {
    return {message: "El documento fue eliminado", status: true};
  } else {
    return {message: "El documento no ha sido eliminado", status: false};

  }
}
catch (e) {
  return {message: e, status: false};
}
}


module.exports = {
  saveOrUpdateAspUisAcademic ,
  getAspUisAcademicByProgramaAcademico,
  getAspUisAcademic,
  getAspUisAcademicById,
  getAspUisAcademicByCodigo,
  getAspUisAcademicByPeriodoAcademico,
  getAspUisAcademicByAnoInscripcion,
  deleteAspUisAcademic,
  getAspUisAcademicByEstado
}