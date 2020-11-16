const validator = require('./generic.validators')

const validateDepartamento = (user) => {
  const properties = ['nombre_departamento', 'codigo_departamento', 'codigo_pais']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
   //validator.validateAndTransformId(padlock, 'codigo_pais', 'El codigo de pais no es valido')
  //validator.validateAndTransformId(padlock, 'pais', 'El id dell pais no es valido')

}

module.exports = {
    validateDepartamento ,
    transformObjectId,
    ...validator
}
