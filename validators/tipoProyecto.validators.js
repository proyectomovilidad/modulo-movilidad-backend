const validator = require('./generic.validators')

const validateTipoProyecto = (user) => {
  const properties = ['nombre_tipoProyecto']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {


}

module.exports = {
    validateTipoProyecto ,
    transformObjectId,
    ...validator
}