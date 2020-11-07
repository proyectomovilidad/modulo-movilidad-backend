const validator = require('./generic.validators')

const validateProgramaAcademico = (user) => {
  const properties = ['nombre_programaAcademico']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
    validateProgramaAcademico ,
    transformObjectId,
    ...validator
}
