const validator = require('./generic.validators')

const validateEntidadFinanciera = (user) => {
  const properties = ['nombre_entidad']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
    validateEntidadFinanciera ,
    transformObjectId,
    ...validator
}