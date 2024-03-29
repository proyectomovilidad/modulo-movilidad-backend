const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')
const enviroment = require('../bd/enviroment')



const saveOrUpdateAspUisPersonal = async (aspUisPersonalId, aspUisPersonalBody) => {
  const connection = await mongoConnector
  delete aspUisPersonalBody._id
  const valid = await getValidarAspirantes(aspUisPersonalBody.codigo_est)

  if ((valid === 0 && !aspUisPersonalId) || (aspUisPersonalId)) {
    const aspUisPersonal = await connection.collection('aspUisPersonal').findOneAndUpdate({
      _id: new ObjectId(aspUisPersonalId)
    }, {
      $set: aspUisPersonalBody
    }, {
      upsert: true,
      returnOriginal: false
    })
    return aspUisPersonal.value
  }
  return { status: false }
}

const getAspiranteUisPersonal = async () => {
  const connection = await mongoConnector
  const aspUisPersonal = await connection.collection('aspUisPersonal').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return aspUisPersonal
}

const getValidarAspirantes = async (codigo_est) => {
  const connection = await mongoConnector
  const aspUisPersonal = await connection.collection('aspUisPersonal').find({ codigo_est: codigo_est }).count()
  return aspUisPersonal
}

const getAspUisPersonalById = async (Id) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(Id)
      }
    },
    {
      $lookup: {
        from: 'aspUisAcademic',
        localField: 'codigo_est',
        foreignField: 'codigo_est',
        as: 'aspUisAcademic'
      }
    }, {
      $unwind: {
        path: '$aspUisAcademic'
      }
    },
    {
      $lookup: {
        from: 'inscripcion',
        localField: 'codigo_est',
        foreignField: 'codigo_est',
        as: 'inscripcion'
      }
    }, {
      $unwind: {
        path: '$inscripcion'
      }
    }
  ]
  const aspUisPersonal = await connection.collection('aspUisPersonal').aggregate(aggregate).toArray()
  return aspUisPersonal
}

const deleteAspUisPersonal = async (_id) => {
  const connection = await mongoConnector
  try {
    const aspUisPersonal = await connection.collection('aspUisPersonal').deleteOne({ codigo_est: _id })

    if (aspUisPersonal.deletedCount === 1) {
      return { message: "El documento fue eliminado", status: true };
    } else {
      return { message: "El documento no ha sido eliminado", status: false };

    }
  }
  catch (e) {
    return { message: e, status: false };
  }
}

const getAspirantesUisPersonal = async () => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda

      }
    },
    {
      $lookup: {
        from: 'aspUisAcademic',
        localField: 'codigo_est',
        foreignField: 'codigo_est',
        as: 'aspUisAcademic'
      }
    }, {
      $unwind: {
        path: '$aspUisAcademic'
      }
    },
    {
      $lookup: {
        from: 'inscripcion',
        localField: 'codigo_est',
        foreignField: 'codigo_est',
        as: 'Inscripcion'
      }
    }, {
      $unwind: {
        path: '$Inscripcion'
      }
    }
  ]
  const aspUisPersonal = await connection.collection('aspUisPersonal').aggregate(aggregate).toArray()
  aspUisPersonal.forEach(element => {
    element.Inscripcion.estado = eval(`enviroment.tiposEstado['e${element.Inscripcion.estado}']`)    
  });
  return aspUisPersonal
}

const transformarConsulta = (consulta) => {

  let nuevaConsulta = {}
  for (let c in consulta) {

    if (consulta[c]) {
      if (c.includes("._id")) {
        nuevaConsulta[`${c}`] = ObjectId(consulta[c]);
      } else {
        nuevaConsulta[`${c}`] = consulta[c];
      }
    }
  }
  return nuevaConsulta
}

const consultarEstudiantes = async (consulta) => {
  const connection = await mongoConnector


  let aggregate = [  // Array de objetos
    {
      $project: {
        'aspUisPersonal': "$$ROOT"
      }
    },
    {
      $lookup: {
        from: 'aspUisAcademic',
        localField: 'aspUisPersonal.codigo_est',
        foreignField: 'codigo_est',
        as: 'aspUisAcademic'
      }
    }, {
      $unwind: {
        path: '$aspUisAcademic'
      }
    },
    {
      $lookup: {
        from: 'inscripcion',
        localField: 'aspUisPersonal.codigo_est',
        foreignField: 'codigo_est',
        as: 'Inscripcion'
      }
    }, {
      $unwind: {
        path: '$Inscripcion'
      }
    },

    {
      $lookup: {
        from: 'tipoMovilidad',
        localField: 'Inscripcion.tipo_movilidad',
        foreignField: '_id',
        as: 'TipoMovilidad'
      }
    }, {
      $unwind: {
        path: '$TipoMovilidad'
      }
    },

    {
      $lookup: {
        from: 'institucionCooperante',
        localField: 'Inscripcion.nombre_institucion',
        foreignField: '_id',
        as: 'InstitucionCooperante'
      }
    }, {
      $unwind: {
        path: '$InstitucionCooperante'
      }
    },

    {
      $match: transformarConsulta(consulta)
    }
  ]
console.log ("consulta", transformarConsulta(consulta))
  const aspUisPersonal = await connection.collection('aspUisPersonal').aggregate(aggregate).toArray()

  aspUisPersonal.forEach(element => {
    element.Inscripcion.estado = eval(`enviroment.tiposEstado['e${element.Inscripcion.estado}']`)
  });
  return aspUisPersonal
}

const getAspUisPersonalByCorreo = async (correo) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $lookup: {
        from: "inscripcion",
        localField: "codigo_est",
        foreignField: "codigo_est",
        as: "Inscripcion"
      }
    }, {
      $unwind: "$Inscripcion"
    },
    {
      $match: {
        "correo": correo
      }
    }
  ]
  console.log(correo);
  const aspUisPersonal = await connection.collection('aspUisPersonal').aggregate(aggregate).toArray()
  console.log(aspUisPersonal)
  return aspUisPersonal[0]
}


const getAspirantesUisPersonalAdmitidos = async () => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        "Inscripcion.admitido": 1
      }
    },
    {
      $lookup: {
        from: 'aspUisAcademic',
        localField: 'codigo_est',
        foreignField: 'codigo_est',
        as: 'aspUisAcademic'
      }
    }, {
      $unwind: {
        path: '$aspUisAcademic'
      }
    },
    {
      $lookup: {
        from: 'inscripcion',
        localField: 'codigo_est',
        foreignField: 'codigo_est',
        as: 'Inscripcion'
      }
    }, {
      $unwind: {
        path: '$Inscripcion'
      }
    }
  ]
  const aspUisPersonal = await connection.collection('aspUisPersonal').aggregate(aggregate).toArray()
  aspUisPersonal.forEach(element => {
    element.Inscripcion.estado = eval(`enviroment.tiposEstado['e${element.Inscripcion.estado}']`)

  });
  return aspUisPersonal
}



module.exports = {
  saveOrUpdateAspUisPersonal,
  getAspiranteUisPersonal,
  getAspUisPersonalById,
  getAspirantesUisPersonal,
  consultarEstudiantes,
  deleteAspUisPersonal,
  getAspUisPersonalByCorreo,
  getAspirantesUisPersonalAdmitidos
}
