const validator = require('./generic.validators')

const validateTipoMovilidad = (user) => {
  const properties = ['nombre_movilidad']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
    validateTipoMovilidad ,
    transformObjectId,
    ...validator
}