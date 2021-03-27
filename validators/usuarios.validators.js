const validator = require('./generic.validators')

const validateUsuario = (user) => {
  const properties = ['correo', 'contrasena']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
 
}

module.exports = {
    validateUsuario,
    transformObjectId,
    ...validator
}