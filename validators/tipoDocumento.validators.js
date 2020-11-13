const validator = require('./generic.validators')

const validateDocumento = (user) => {
  const properties = ['nombre_documento', 'estado_documento']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
  validateDocumento ,
    transformObjectId,
    ...validator
}


