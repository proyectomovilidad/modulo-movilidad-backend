const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateInscripcion = async (inscripcionId, inscripcionBody) => {
  const connection = await mongoConnector
  delete inscripcionBody._id
  const inscripcion = await connection.collection('inscripcion').findOneAndUpdate({
    _id: new ObjectId(inscripcionId)
  }, {
    $set:inscripcionBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return inscripcion.value
}

const getInscripcion = async ()=> {
  const connection = await mongoConnector
 
  const inscripcion = await connection.collection('inscripcion').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return inscripcion
}

const getInscripcionByNumeroInscripcion = async (numeroInscripcionId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(numeroInscripcionId)
      }
    }
  ]
  const inscripcion = await connection.collection('inscripcion').aggregate(aggregate).toArray()
  return inscripcion
}



const getInscripcionByTipoMovilidad = async (tipoMovilidadId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        tipo_movilidad: new ObjectId(tipoMovilidadId)
      }
    }
  ]
  const inscripcion  = await connection.collection('inscripcion').aggregate(aggregate).toArray()
  return inscripcion
}

const getInscripcionByTipoEstado = async (tipoEstadoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        tipo_estado: new ObjectId(tipoEstadoId)
      }
    }
  ]
  const inscripcion  = await connection.collection('inscripcion').aggregate(aggregate).toArray()
  return inscripcion
}



const getInscripcionBySede = async (sede)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        sede: new ObjectId(sede)
      }
    }
  ]
  const inscripcion  = await connection.collection('inscripcion').aggregate(aggregate).toArray()
  return inscripcion
}

const getInscripcionByInstitucionCooperante = async (institucionCooperanteId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        institucion_cooperante: new ObjectId(institucionCooperanteId)
      }
    }
  ]
  const inscripcion  = await connection.collection('inscripcion').aggregate(aggregate).toArray()
  return inscripcion
}

const getInscripcionByConvenio = async (convenioId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        codigo_convenio: new ObjectId(convenioId)
      }
    }
  ]
  const inscripcion  = await connection.collection('inscripcion').aggregate(aggregate).toArray()
  return inscripcion
}


const getInscripcionByProgramaAcademico = async (programaAcademicoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        programa_acad: new ObjectId(programaAcademicoId)
      }
    }
  ]
  const inscripcion = await connection.collection('inscripcion').aggregate(aggregate).toArray()
  return inscripcion
}





module.exports = {
    saveOrUpdateInscripcion,
    getInscripcion,
    getInscripcionByNumeroInscripcion,
    getInscripcionByTipoMovilidad,
    getInscripcionByTipoEstado,
    getInscripcionBySede,
    getInscripcionByInstitucionCooperante,
    getInscripcionByConvenio,
    getInscripcionByProgramaAcademico
}