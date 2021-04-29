const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateConvenio = async (convenioId, convenioBody) => {
  const connection = await mongoConnector
  delete convenioBody._id
  const convenio = await connection.collection('convenio').findOneAndUpdate({
    _id: new ObjectId(convenioId)
  }, {
    $set: convenioBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return convenio.value
}

const getConvenio = async () => {
  const connection = await mongoConnector

  const convenio = await connection.collection('convenio').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return convenio
}


const getConvenioById = async (convenioId) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(convenioId)
      }
    }
  ]
  const convenio = await connection.collection('convenio').aggregate(aggregate).toArray()
  return convenio
}

const getConvenioByTipoMovilidad = async (tipoMovilidadId) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        
        tipo_movilidad: new ObjectId(tipoMovilidadId)
      }      
    },

  /*  {
      $lookup: {
        from: 'tipoMovilidad',
        localField: 'convenio.tipo_movilidad',
        foreignField: '_id',
        as: 'aspExtAcademic'
      }
    }, {
      $unwind: {
        path: '$aspExtAcademic'
      }
    }, */ 
  ]
  const convenio = await connection.collection('convenio').aggregate(aggregate).toArray()
  return convenio
}

const getConvenioByInstitucion = async (institucion) => {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos    
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        nombre_institucion: new ObjectId(institucion),
        estado_convenio: 'activo'
      }
    }
  ]
  const convenio = await connection.collection('convenio').aggregate(aggregate).toArray()
  return convenio
}


const deleteConvenio = async (_id) => {
  const connection = await mongoConnector
  try {
    const convenio = await connection.collection('convenio').findOneAndDelete({ _id: _id })

    if (convenio.ok === 1) {
      return { message: "El documento fue eliminado", status: true };
    } else {
      return { message: "El documento no ha sido eliminado", status: false };

    }
  }
  catch (e) {
    return { message: e, status: false };
  }
}

  const getConveniosConsulta = async () => {
    const connection = await mongoConnector
    let aggregate = [  // Array de objetos
      {
        $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda

        }
      },
      {
        $lookup: {
          from: 'institucionCooperante',
          localField: 'codigo_inst',
          foreignField: 'codigo_inst',
          as: 'InstitucionCooperante'
        }
      }, {
        $unwind: {
          path: '$InstitucionCooperante'
        }
      }
    ]
    const convenios = await connection.collection('convenio').aggregate(aggregate).toArray()
    return convenios
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

  const consultarConvenios = async (consulta) => {
    const connection = await mongoConnector


    let aggregate = [  // Array de objetos
      {
        $project: {
          'convenio': "$$ROOT"
        }
      },
      {
        $lookup: {
          from: 'institucionCooperante',
          localField: 'convenio.codigo_inst',
          foreignField: 'codigo_inst',
          as: 'InstitucionCooperante'
        }
      }, {
        $unwind: {
          path: '$InstitucionCooperante'
        }
      },
      {
        $lookup: {
          from: 'tipoMovilidad',
          localField: 'convenio.tipo_movilidad',
          foreignField: '_id',
          as: 'TipoMovilidad'
        }
      }, {
        $unwind: {
          path: '$TipoMovilidad'
        }
      },

      {
        $match: transformarConsulta(consulta)
      }


    ]
    const convenios = await connection.collection('convenio').aggregate(aggregate).toArray()
    return convenios

  }

  const getConvenioByProgAcadInstTipoMov = async (progAcadId, instId, tipoMovId)=>{
    const connection = await mongoConnector
    const aggregate = [{
      $match: {
        'nombre_institucion': new ObjectId(instId),
        'tipo_movilidad': new ObjectId(tipoMovId),
        'programa_acad': new ObjectId(progAcadId),
        'estado_convenio': 'activo'
      }
    }]

    const convenios = await connection.collection('convenio').aggregate(aggregate).toArray()
    return convenios
  }


module.exports = {
  saveOrUpdateConvenio,
  getConvenio,
  getConvenioById,
  deleteConvenio,
  getConvenioByTipoMovilidad,
  getConvenioByInstitucion,
  getConveniosConsulta,
  consultarConvenios,
  getConvenioByProgAcadInstTipoMov
}