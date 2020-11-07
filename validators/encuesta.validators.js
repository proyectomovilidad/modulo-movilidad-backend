const validator = require('./generic.validators')

const validateEncuesta = (user) => {
  const properties = ['descrip_encuesta', 'fecha_inicio', 'fecha_final', 'tipo_encuesta' , 'tipo_proceso']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  validator.validateAndTransformId(padlock, 'tipo_encuesta', 'El id del tipo de encuesta no es valido')
  validator.validateAndTransformId(padlock, 'tipo_proceso', 'El id del tipo de proceso  no es valido')

}

module.exports = {
    validateEncuesta,
    transformObjectId,
    ...validator
}

