
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
    const apoyo = await connection.collection('tipoApoyo').findOneAndDelete({ _id: _id })

    if (apoyo.ok === 1) {
      return { message: "El documento fue eliminado", status: true };
    } else {
      return { message: "El documento no ha sido eliminado", status: false };

    }
  }
  catch (e) {
    return { message: e, status: false };
  }
}


module.exports = {
  saveOrUpdateApoyo,
  getApoyo,
  deleteApoyo
}