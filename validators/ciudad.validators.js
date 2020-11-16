const validator = require('./generic.validators')

const validateCiudad = (user) => {
  const properties = ['nombre_ciudad', 'codigo_ciudad', 'codigo_departamento', 'codigo_pais']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  //validator.validateAndTransformId(padlock, 'codigo_departamento', 'El códgio de departamento no es valido')
  //validator.validateAndTransformId(padlock, 'codigo_pais', 'El id del pais no es valido')

}

module.exports = {
    validateCiudad ,
    transformObjectId,
    ...validator
}
