const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateConvocatoria  = async (convocatoriaId, convocatoriaBody) => {
  const connection = await mongoConnector
  delete convocatoriaBody._id
  const convocatoria = await connection.collection('convocatoria').findOneAndUpdate({
    _id: new ObjectId(convocatoriaId)
  }, {
    $set:convocatoriaBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return convocatoria.value
}

const getConvocatorias = async ()=> {
  const connection = await mongoConnector
 
  const convocatorias = await connection.collection('convocatoria').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return convocatorias
}


const getConvocatoriaById = async (convocatoriaId)=> {
  const connection = await mongoConnector
  let aggregate = [  // Array de objetos
    {
      $match: { // Reperesenta el select en mongo, los atributos dentro de las llaves son los criterios de busqieda
        _id: new ObjectId(convocatoriaId)
      }
    }
  ]
  const convocatoria = await connection.collection('convocatoria').aggregate(aggregate).toArray()
  return convocatoria
}

const deleteConvocatoria = async (_id) => {
  const connection = await mongoConnector
  try {
    const convocatoria = await connection.collection('convocatoria').deleteOne({ _id: new ObjectId(_id) })

    if (convocatoria.deletedCount === 1) {
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
      if (c.includes("._id") || c.includes("nombre_institucion")) {
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
    {
      $project: {
        "convocatoria": "$$ROOT"
      }
    },
    {
      $lookup: {
        from: "institucionCooperante",
        localField: "convocatoria.nombre_institucion",
        foreignField: "_id",
        as: "InstitucionCooperante"
      }
    }, {
      $unwind: "$InstitucionCooperante"
    },
    {
      $match: transformarConsulta(consulta)
    }
  ];
  console.log(aggregate)
  const respConsulta = connection.collection('convocatoria').aggregate(aggregate).toArray()
  return respConsulta
}

module.exports = {
    saveOrUpdateConvocatoria,
    getConvocatorias,
    getConvocatoriaById,
    deleteConvocatoria,
    consultar
}
