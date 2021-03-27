const validator = require('./generic.validators')

const validateEntornoMovilidad = (user) => { 
  const properties = []
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
 
}

module.exports = {
    validateEntornoMovilidad ,
    transformObjectId,
    ...validator
}