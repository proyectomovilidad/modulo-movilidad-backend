const validator = require('./generic.validators')

const validateAspExtPersonal = (user) => {
  const properties = ['primer_nombre', 'primer_apellido', 'tipo_doc_id', 'documento_id' , 'celular',
  'genero', 'fecha_nacimiento', 'pais_nacimiento', 'pais_res', 'departamento', 'ciudad', 'direccion']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {

  /*
  validator.validateAndTransformId(padlock, 'ciudad', 'El id de la ciudad no es valido')
  validator.validateAndTransformId(padlock, 'departamento', 'El id de la ciudad no es valido')
  validator.validateAndTransformId(padlock, 'tipo_doc_id', 'El id del tipo de doc no es valido')
  validator.validateAndTransformId(padlock, 'genero', 'El id del genero no es valido')
  validator.validateAndTransformId(padlock, 'pais_nacimiento', 'El id del país de nacimiento no es valido')
  validator.validateAndTransformId(padlock, 'pais_res', 'El id del país de residencia no es valido')
*/

}

module.exports = {
    validateAspExtPersonal,
    transformObjectId,
    ...validator
}

