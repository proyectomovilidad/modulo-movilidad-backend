const validator = require('./generic.validators')

const validatePais = (user) => {
  const properties = ['nombre_pais']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
    validatePais ,
    transformObjectId,
    ...validator
}
