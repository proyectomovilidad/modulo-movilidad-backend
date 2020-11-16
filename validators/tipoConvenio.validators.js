const validator = require('./generic.validators')

const validateTipoConvenio = (user) => {
  const properties = ['nombre_tipo_convenio']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
    validateTipoConvenio ,
    transformObjectId,
    ...validator
}