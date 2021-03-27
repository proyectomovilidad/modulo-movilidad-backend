const validator = require('./generic.validators')

const validateInscripcion = (user) => {
  const properties = [ 'tipo_movilidad', 'nombre_institucion']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  validator.validateAndTransformId(padlock, 'nombre_institucion', 'El id del nombre de la institución  no es valido')
  validator.validateAndTransformId(padlock, 'tipo_movilidad', 'El id del tipo de movilidad  no es valido')
  //validator.validateAndTransformId(padlock, 'nombre_convenio', 'El id del nombre del convenio  no es valido')

}

module.exports = {
    validateInscripcion,
    transformObjectId,
    ...validator
}
