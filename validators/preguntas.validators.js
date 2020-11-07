const validator = require('./generic.validators')

const validatePreguntas = (user) => {
  const properties = ['desrip_pregunta', 'estado_pregunta', 'tipo_pregunta']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  validator.validateAndTransformId(padlock, 'estado_pregunta', 'El id del estado de la pregunta no es valido')
  validator.validateAndTransformId(padlock, 'tipo_pregunta', 'El id del tipo de pregunta  no es valido')

}

module.exports = {
    validatePreguntas,
    transformObjectId,
    ...validator
}



