const validator = require('./generic.validators')

const validateConvocatoria = (user) => {
  const properties = ['nombre_convocatoria', 'estado_convocatoria', 'fecha_inicio', 'fecha_final', 'fecha_suscripcion', 
   'nombre_institucion', 'periodo_convocatoria', 'tipo_proyecto', 'link_inscripcion' ]
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {

 validator.validateAndTransformId(padlock, 'nombre_institucion', 'El id del nombre institución no es valido') 

 
 

}

module.exports = {
    validateConvocatoria ,
    transformObjectId,
    ...validator
}
