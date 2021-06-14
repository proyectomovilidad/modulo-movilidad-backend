
const { ObjectId } = require('mongodb')
const mongoConnector = require('../bd/mongo.db')


const saveOrUpdateApoyo = async (apoyoId, apoyoBody) => {
  const connection = await mongoConnector
  delete apoyoBody._id
  const apoyo = await connection.collection('tipoApoyo').findOneAndUpdate({
    _id: new ObjectId(apoyoId)
  }, {
    $set: apoyoBody
  }, {
    upsert: true,
    returnOriginal: false
  })
  return apoyo.value
}

const getApoyo = async () => {
  const connection = await mongoConnector

  const apoyo = await connection.collection('tipoApoyo').find({}).toArray() // Devuelve la respuesta como un array de objetos
  return apoyo
}

const deleteApoyo = async (_id) => {
  const connection = await mongoConnector
  try {
    const apoyo = await connection.collection('tipoApoyo').deleteOne({ _id: new ObjectId(_id) });

    if (apoyo.deletedCount === 1) {
      return {status: true };
    } else {
      return { status: false };

    }
  }
  catch (e) {
    return { message: e.toString(), status: false };
  }
}

const getTipoApoyoById = async (_id) => {
  const connection = await mongoConnector;
  const tipoApoyo = await connection.collection('tipoApoyo').find({_id: new ObjectId(_id)}).toArray();
console.log('desde model: ', tipoApoyo[0]);
  return tipoApoyo[0];
}

const getTipoApoyoByEstrato = async (estratos) => {
  const connection = await mongoConnector
  const tipo_apoyos = await connection.collection('tipoApoyo').find({estratos_tipo_apoyo: { $all: estratos }}).toArray()

  return tipo_apoyos
}


module.exports = {
  saveOrUpdateApoyo,
  getApoyo,
  deleteApoyo,
  getTipoApoyoByEstrato,
  getTipoApoyoById
}
