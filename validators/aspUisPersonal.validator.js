const validator = require('./generic.validators')

const validateAspUisPersonal = (user) => {
  const properties = ['primer_nombre', 'primer_apellido', 'tipo_doc_id', 'documento_id' , 'celular'
  , 'genero', 'fecha_nacimiento', 'pais_nacimiento','departamento', 'ciudad', 'direccion','codigo_est' ]
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  /*
  validator.validateAndTransformId(padlock, 'ciudad', 'El id de la ciudad no es valido')
  validator.validateAndTransformId(padlock, 'departamento', 'El id del departamento no es valido')
  validator.validateAndTransformId(padlock, 'genero', 'El id del genero no es valido')
  validator.validateAndTransformId(padlock, 'pais_nacimiento', 'El id del pais no es valido')
  validator.validateAndTransformId(padlock, 'tipo_doc_id', 'El id del tipo de documento no es valido')
  validator.validateAndTransformId(padlock, 'estrato', 'El id del estrato no es valido')
  */
}

module.exports = {
    validateAspUisPersonal,
    transformObjectId,
    ...validator
}

