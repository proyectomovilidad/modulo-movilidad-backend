const validator = require('./generic.validators')

const validateTipoDocumentoId = (user) => {
  const properties = ['nombre_documentoId']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
  validateTipoDocumentoId ,
    transformObjectId,
    ...validator
}
