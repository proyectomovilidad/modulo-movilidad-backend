const validator = require('./generic.validators')

const validateEntornoMovilidad = (user) => { 
  const properties = ["periodo", "tipo", "fecha_inicio", "fecha_final"]
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
 
}

module.exports = {
    validateEntornoMovilidad ,
    transformObjectId,
    ...validator
}