const validator = require('./generic.validators')

const validateUsuario = (user) => {
  const properties = ['correo', 'contrasena', 'rol']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
 
}

module.exports = {
    validateUsuario,
    transformObjectId,
    ...validator
}
