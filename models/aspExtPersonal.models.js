const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')
const enviroment = require('../bd/enviroment')



const saveOrUpdateAspExtPersonal  = async (aspExtPersonalId, aspExtPersonalBody) => {
  const connection = await mongoConnector
  delete aspExtPersonalBody._id
  const valid = await getValidarAspirantes(aspExtPersonalBody.documento_id)
  console.log(valid)
  if ((valid === 0 && !aspExtPersonalId)|| (aspExtPersonalId)) {
  const aspExtPersonal = await connection.collection('aspExtPersonal').findOneAndUpdate({
    _id: new ObjectId(aspExtPersonalId)
  }, {
    $set: aspExtPersonalBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return aspExtPersonal.value
}
return {status: false}
}


const getAspExtPersonal= async ()=> {
  const connection = await mongoConnector
 
  const aspExtPersonal = await connection.collection('aspExtPersonal').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return aspExtPersonal
}


const getValidarAspirantes = async (documento_id) => {
  const connection = await mongoConnector
  const aspExtPersonal = await connection.collection('aspExtPersonal').find({ documento_id: documento_id }).count()
  return aspExtPersonal

}

const getAspExtPersonalById = async (Id)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(Id)
      }
    },
    {
      $lookup: {
        from: 'aspExtAcademic',
        localField: 'documento_id',
        foreignField: 'documento_id',
        as: 'aspExtAcademic'
      } 
    },{
      $unwind: {
          path: '$aspExtAcademic'
        }
     },
     {
      $lookup: {
        from: 'inscripcion',
        localField: 'documento_id',
        foreignField: 'documento_id',
        as: 'inscripcion'
      } 
    },{
      $unwind: {
          path: '$inscripcion'
        }
     }
  ]
  const aspExtPersonal = await connection.collection('aspExtPersonal').aggregate(aggregate).toArray()
  return aspExtPersonal
}

const getAspExtPersonalByDocumentoId = async (documentoId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        documento_id: String (documentoId)
      }
    }
  ]
  const aspExtPersonal = await connection.collection('aspExtPersonal').aggregate(aggregate).toArray()
  return aspExtPersonal
}

const deleteAspExtPersonalByDocument = async (documento_id) => {
  const connection = await mongoConnector

  const aspExtPersonal = await connection.collection('aspExtPersonal').deleteOne({documento_id: documento_id}, function(err, obj) {
    if (err) return {message: err, document:null};
    return {document: obj.document_id, message: "El documento ha sido eliminado", status: true}
  });
  return "Error 500";
}



const getAspirantesExtPersonal = async () => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { 

      }
    },
    {
      $lookup: {
        from: 'aspExtAcademic',
        localField: 'documento_id',
        foreignField: 'documento_id',
        as: 'aspExtAcademic'
      }
    }, {
      $unwind: {
        path: '$aspExtAcademic'
      }
    },
    {
      $lookup: {
        from: 'inscripcion',
        localField: 'documento_id',
        foreignField: 'documento_id',
        as: 'Inscripcion'
      }
    }, {
      $unwind: {
        path: '$Inscripcion'
      }
    }
  ]
  const aspExtPersonal = await connection.collection('aspExtPersonal').aggregate(aggregate).toArray()

  aspExtPersonal.forEach(element => {
    element.Inscripcion.estado= eval(`enviroment.tiposEstado.e${element.Inscripcion.estado}`
    )
  
 });
  return aspExtPersonal
}

function transformarConsulta(consulta) {

  const nuevaConsulta = {}
  for (c in consulta) {

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

const consultarExternos = async (consulta) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $project: {
        'aspExtPersonal': "$$ROOT"
      }
    },
    {
      $lookup: {
        from: 'aspExtAcademic',
        localField: 'aspExtPersonal.documento_id',
        foreignField: 'documento_id',
        as: 'aspExtAcademic'
      }
    }, {
      $unwind: {
        path: '$aspExtAcademic'
      }
    },
    {
      $lookup: {
        from: 'inscripcion',
        localField: 'aspExtPersonal.documento_id',
        foreignField: 'documento_id',
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
  const aspExtPersonal = await connection.collection('aspExtPersonal').aggregate(aggregate).toArray()
  console.log("resultado ", transformarConsulta(consulta))
  return aspExtPersonal

} 

const getAspExtPersonalByCorreo = async (correo) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { correo: correo
      }
    },
    {
      $lookup: {
        from: 'inscripcion',
        localField: 'aspExtPersonal.documento_id',
        foreignField: 'documento_id',
        as: 'Inscripcion'
      }
    }, 
    {
      $unwind: {
        path: '$Inscripcion'
      }
      
    }

  ]
  const aspExtPersonal = await connection.collection('aspExtPersonal').aggregate(aggregate).toArray()
  return aspExtPersonal[0]
}

//obtener estudiantes admitidos
const getAspirantesExtPersonalAdmitidos = async (limit) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { 
        "Inscripcion.admitido": 1
      }
    },
    {
      $lookup: {
        from: 'aspExtAcademic',
        localField: 'documento_id',
        foreignField: 'documento_id',
        as: 'aspExtAcademic'
      }
    }, {
      $unwind: {
        path: '$aspExtAcademic'
      }
    },
    {
      $lookup: {
        from: 'inscripcion',
        localField: 'documento_id',
        foreignField: 'documento_id',
        as: 'Inscripcion'
      }
    }, {
      $unwind: {
        path: '$Inscripcion'
      }
    }
  ]
  const aspExtPersonal = await connection.collection('aspExtPersonal').aggregate(aggregate).toArray()

  aspExtPersonal.forEach(element => {
    element.Inscripcion.estado= eval(`enviroment.tiposEstado.e${element.Inscripcion.estado}`
    )
  
 });
  return aspExtPersonal
}


module.exports = {
  saveOrUpdateAspExtPersonal ,
  getAspExtPersonal,
  getAspExtPersonalById,
  getAspExtPersonalByDocumentoId,
  deleteAspExtPersonalByDocument,
  getAspirantesExtPersonal,
  consultarExternos,
  getAspExtPersonalByCorreo,
  getAspirantesExtPersonalAdmitidos
}