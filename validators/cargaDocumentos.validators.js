const validator = require('./generic.validators')

const validatecargaDocumentos = (user) => {
  const properties = ['nro_inscripcion', 'tipo_doc', 'estado_doc', 'fecha_entrega' , 'archivo',
   'tipo_proceso']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  validator.validateAndTransformId(padlock, 'nro_inscripcion', 'El numero de inscripcion no es valido') // Id de la tabla inscripción
  validator.validateAndTransformId(padlock, 'tipo_doc', 'El id del tipo de doc no es valido')
  validator.validateAndTransformId(padlock, 'tipo_proceso', 'El id del tipo de proceso no es valido')
  validator.validateAndTransformId(padlock, 'estado_doc', 'El id del tipo de proceso no es valido')


}

module.exports = {
    validatecargaDocumentos ,
    transformObjectId,
    ...validator
}
