const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateInscripcion = async (inscripcionId, inscripcionBody) => {
  const connection = await mongoConnector
  delete inscripcionBody._id
  const valid = await getValidarAspirantes(inscripcionBody.codigo_est, inscripcionBody.documento_id)
  
  if ((valid === 0 && !inscripcionId) || (inscripcionId) ) {
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
  return {}
}

const getValidarAspirantes = async (codigo_est, documento_id) => {
  const connection = await mongoConnector
  const inscripcion = await connection.collection('inscripcion').find({codigo_est: codigo_est, documento_id: documento_id, estado: "1"}).count() 
return inscripcion

}

const updateInscripcionStatus = async (estado, _id)=>{
  const connection = await mongoConnector
  const inscripcion = await connection.collection('inscripcion').update(
    {_id: new ObjectId(_id)},
    {$set: {estado: estado}},
    {upsert: true, returnOriginal: false}
  )

  return inscripcion
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

const deleteAspExtInscripcionByDocument = async (documento_id) => {
  const connection = await mongoConnector

  const inscripcion = await connection.collection('inscripcion').findOneAndDelete({ _id: new ObjectId(documento_id) });

  if (inscripcion.ok === 1) {
    return { message: "El documento fue eliminado", status: true };
  } else {
    return { message: "El documento no ha sido eliminado", status: false };

  }
}

const deleteAspUisInscripcion = async (codigo_est) => {
  const connection = await mongoConnector

  const inscripcion = await connection.collection('inscripcion').findOneAndDelete({ _id: codigo_est });

  if (inscripcion.ok === 1) {
    return { message: "El documento fue eliminado", status: true };
  } else {
    return { message: "El documento no ha sido eliminado", status: false };

  }
}



const cambiarEstadoInscripcionById = async (estado, _id)=>{
  const connection = await mongoConnector
 
  const inscripcion = await connection.collection('inscripcion').findOneAndUpdate({
    _id: new ObjectId(_id)
  }, {
    $set: {estado: estado}
  }, {
    upsert: true,
    returnOriginal: false
  })
  return inscripcion.value
 }

const getInscripcionByEstudiante = async (consulta)=>{
  const connection = await mongoConnector
  const inscripciones = await connection.collection('inscripcion').find(consulta).toArray()

  return inscripciones

}

const tiposEstado ={
  "e1": "Inscrito",
  "e2": "Aceptado",
  "e3": "Rechazado",
  "e4": "Movilidad",
  "e5": "Cancelado",
  "e6": "Finalizado",
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
    getInscripcionByProgramaAcademico,
    deleteAspExtInscripcionByDocument,
    deleteAspUisInscripcion,
    cambiarEstadoInscripcionById,
    getInscripcionByEstudiante,
    updateInscripcionStatus
}
