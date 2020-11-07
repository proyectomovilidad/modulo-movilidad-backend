const validator = require('./generic.validators')

const validateApoyo = (user) => {
  const properties = ['nombre_tipo_apoyo']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
    validateApoyo ,
    transformObjectId,
    ...validator
}
