const validator = require('./generic.validators')

const validateCiudad = (user) => {
  const properties = ['nombre']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
 // validator.validateAndTransformId(padlock, 'nro_inscripcion', 'El numero de inscripcion no es valido')
  //validator.validateAndTransformId(padlock, 'pais', 'El id dell pais no es valido')

}

module.exports = {
    validateCiudad ,
    transformObjectId,
    ...validator
}
