const errorUtils = require("./../shared/error.shared")
const { ObjectId } = require('mongodb')

const validateId = (property, errorMessage) => {
  if (!property || (property.length !== 12 && property.length !== 24)) {
    throw errorUtils.getErrorResponse(400, errorMessage)
  }
}

const validateAndTransformId = (object, property, errorMessage) => {
  if (object && object[property] && (typeof object[property] === 'string')) {
    validateId(object[property], errorMessage)
    object[property] = new ObjectId(object[property])
  }
}

const validateAndTransformIdArray = (object, property, errorMessage) => {
  const newArray = []
  if (!object[property]) return
  for (const element of object[property]) {
    if (typeof element === 'string') {
      newArray.push(new ObjectId(element))
    } else {
      throw errorUtils.getErrorResponse(400, errorMessage)
    }
  }
  object[property] = newArray
}

const validateAndTransformDate = (object, property, errorMessage) => {
  if (object[property]) {
    object[property] = new Date(object[property])
  }
}

const validateProperties = (object, mandatoryProperties) => {
  let errorMessage = ''
  for (const property of mandatoryProperties) {
    if (object[property] == undefined) {
      errorMessage += property + ', '
    }
  }
  if (errorMessage.length > 0) {
    errorMessage = errorMessage.slice(0, -2)
    throw errorUtils.getErrorResponse(400, 'Las siguientes propiedades son requeridas: ' + errorMessage)
  }
}

module.exports = {
  validateId,
  validateAndTransformId,
  validateProperties,
  validateAndTransformDate,
  validateAndTransformIdArray
}



