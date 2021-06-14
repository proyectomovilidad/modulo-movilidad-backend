const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateInstitucionCooperante = async (institucionCooperanteId, institucionCooperanteBody) => {
  const connection = await mongoConnector
  delete institucionCooperanteBody._id
  const institucionCooperante = await connection.collection('institucionCooperante').findOneAndUpdate({
    _id: new ObjectId(institucionCooperanteId)
  }, {
    $set:institucionCooperanteBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return institucionCooperante.value
}

const getInstitucionCooperante = async ()=> {
  const connection = await mongoConnector
 
  const institucionCooperante = await connection.collection('institucionCooperante').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return institucionCooperante
}

const getInstitucionCooperanteById = async (institucionCooperanteId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(institucionCooperanteId)
      }
    }
  ]
  const institucionCooperante  = await connection.collection('institucionCooperante').aggregate(aggregate).toArray()
  return institucionCooperante
}

const getInstitucionByTipoMovilidad = async (tipoMovilidadId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $project: {
        'institucionCooperante': '$$ROOT'
      }
    },
    {
      $lookup: {
        from: 'convenio',
        localField: 'institucionCooperante._id',
        foreignField: 'nombre_institucion',
        as: 'convenios'
      }
    },
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        'convenios.tipo_movilidad': new ObjectId(tipoMovilidadId),
        'convenios.estado_convenio': 'activo'
      }
    }
  ]
  const institucion = await connection.collection('institucionCooperante').aggregate(aggregate).toArray()
  return institucion
}

const getInstitucionCooperanteByPais = async (paisId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        pais: new ObjectId(paisId)
      }
    }
  ]
  const institucionCooperante  = await connection.collection('institucionCooperante').aggregate(aggregate).toArray()
  return institucionCooperante
}

const getInstitucionCooperanteByCiudad = async (ciudadId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        ciudad: new ObjectId(ciudadId)
      }
    }
  ]
  const institucionCooperante  = await connection.collection('institucionCooperante').aggregate(aggregate).toArray()
  return institucionCooperante
}

const deleteInstitucionCooperante = async (_id) => {
  const connection = await mongoConnector
  try {
    const institucionCooperante = await connection.collection('institucionCooperante').deleteOne({ _id: new ObjectId(_id) })

    if (institucionCooperante.deletedCount === 1) {
      return { status: true };
    } else {
      return { status: false };

    }
  }
  catch (e) {
    return { message: e.toString(), status: false };
  }
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

const consultar = async (consulta) => {
  const connection = await mongoConnector;

  const aggregate = [
    {$match: transformarConsulta(consulta) }
  ];

  const resConsulta = connection.collection('institucionCooperante').aggregate(aggregate).toArray();
  return resConsulta;
}


module.exports = {
    saveOrUpdateInstitucionCooperante,
    getInstitucionCooperante,
    getInstitucionCooperanteById,
    getInstitucionCooperanteByPais,
    getInstitucionCooperanteByCiudad,
    getInstitucionByTipoMovilidad,
    deleteInstitucionCooperante,
    consultar
}
