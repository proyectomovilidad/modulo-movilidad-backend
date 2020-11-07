const validator = require('./generic.validators')

const validateInstitucionCooperante = (user) => {
  const properties = ['nombre_institucion', 'pais', 'departamento', 'ciudad', 'direccion', 'telefono', 'email']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
validator.validateAndTransformId(padlock, 'pais', 'El id del pais no es valido')
 validator.validateAndTransformId(padlock, 'departamento', 'El id del departamento no es valido')
 validator.validateAndTransformId(padlock, 'ciudad', 'El id de al ciudad no es valido')

}

module.exports = {
    validateInstitucionCooperante,
    transformObjectId,
    ...validator
}