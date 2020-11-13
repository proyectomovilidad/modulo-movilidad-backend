const validator = require('./generic.validators')

const validateInscripcion = (user) => {
  const properties = ['fecha_inscripcion', 'programa_acad', 'semestre', 'fecha_movilidad' , 
  'codigo_convenio','fecha_retorno', 'tipo_estado', 'tipo_movilidad', 'institucion_cooperante' ]
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  validator.validateAndTransformId(padlock, 'programa_acad', 'El id del tipo del programa académico no es valido')
  validator.validateAndTransformId(padlock, 'codigo_convenio', 'El id del convenio  no es valido')
  validator.validateAndTransformId(padlock, 'tipo_estado', 'El id del tipo de estado  no es valido')
  validator.validateAndTransformId(padlock, 'tipo_movilidad', 'El id del tipo de movilidad  no es valido')
  validator.validateAndTransformId(padlock, 'institucion_cooperante', 'El id de la institución cooperante no es valido')

}

module.exports = {
    validateInscripcion,
    transformObjectId,
    ...validator
}
