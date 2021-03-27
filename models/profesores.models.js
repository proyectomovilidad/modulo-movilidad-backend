const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateProfesores = async (profesoresId, profesoresBody) => {
  const connection = await mongoConnector
  delete profesoresBody._id
  const profesores = await connection.collection('profesores').findOneAndUpdate({
    _id: new ObjectId(profesoresId)
  }, {
    $set: profesoresBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return profesores.value
}

const getProfesores = async () => {
  const connection = await mongoConnector
  const profesores = await connection.collection('profesores').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return profesores
}

const getProfesoresById = async (profesoresId) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(profesoresId)
      }
    }
  ]
  const profesores = await connection.collection('profesores').aggregate(aggregate).toArray()
  return profesores
}

const getProfesoresByDocumentoId = async (documentoId) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        documento_id: new ObjectId(documentoId)
      }
    }
  ]
  const profesores = await connection.collection('profesores').aggregate(aggregate).toArray()
  return profesores
}

const deleteProfesor = async (_id) => {
  const connection = await mongoConnector
  try {
    const profesor = await connection.collection('profesores').findOneAndDelete({ documento_id: _id })

    if (profesor.ok === 1) {
      return { message: "El documento fue eliminado", status: true };
    } else {
      return { message: "El documento no ha sido eliminado", status: false };

    }
  }
  catch (e) {
    return { message: e, status: false };
  }

}

const getProfesoresConsulta = async () => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda

      }
    },
    {
      $lookup: {
        from: 'convocatoria',
        localField: 'codigo_conv',
        foreignField: 'codigo_conv',
        as: 'Convocatoria'
      }
    }, {
      $unwind: {
        path: '$Convocatoria'
      }
    }
  ]
  const profesor = await connection.collection('profesores').aggregate(aggregate).toArray()

  return profesor
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

const consultarProfesores = async (consulta) => {
  const connection = await mongoConnector


  let aggregate = [  // Array de objetos
    {
      $project: {
        'profesores': "$$ROOT"
      }
    },
    {
      $lookup: {
        from: 'convocatoria',
        localField: 'profesores.codigo_conv',
        foreignField: 'codigo_conv',
        as: 'Convocatoria'
      }
    }, {
      $unwind: {
        path: '$Convocatoria'
      }
    },   

    {
      $match: transformarConsulta(consulta)
    }


  ]
  const profesores = await connection.collection('profesores').aggregate(aggregate).toArray()
  console.log("resultado ",  transformarConsulta(consulta))

  return profesores

}


const getProfesorByCorreo = async (correo) => {
  const connection = await mongoConnector
 
  let aggregate = [  // Array de objetos
    {
      $match: { correo: correo
      }
    }
  ]
  const profesor = await connection.collection('profesores').aggregate(aggregate).toArray()

  return profesor[0]
}


module.exports = {
  saveOrUpdateProfesores,
  getProfesores,
  getProfesoresById,
  getProfesoresByDocumentoId,
  deleteProfesor,
  getProfesoresConsulta,
  consultarProfesores,
  getProfesorByCorreo


}