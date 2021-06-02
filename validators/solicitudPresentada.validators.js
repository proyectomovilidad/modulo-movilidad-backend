const validator = require('./generic.validators')

const validateSolicitudPresentada = (user) => {
  const properties = [ 'tipo_apoyo', 'entidad_financiera', 'numero_cuenta', 'tipo_cuenta',
    'fecha_solicitud'] 
  validator.validateProperties(user, properties)
} 

const transformObjectId = (padlock) => {
    
//  validator.validateAndTransformId(padlock, 'nro_inscripcion', 'El id del numero de la inscripción  no es valido')
  //validator.validateAndTransformId(padlock, 'tipo_apoyo', 'El id del tipo de apoyo no es valido')
  //validator.validateAndTransformId(padlock, 'entidad_financiera', 'El id de la entidad financiera no es valido')
  //validator.validateAndTransformId(padlock, 'estado_solicitud', 'El id del estado de la solicitud no es valido')
  //validator.validateAndTransformId(padlock, 'tipo_cuenta', 'El id del tipo de cuenta no es valido')
  //validator.validateAndTransformId(padlock, 'estrato', 'El id del tipo de cuenta no es valido')
  
  

}

module.exports = {
    validateSolicitudPresentada,
    transformObjectId,
    ...validator
}

