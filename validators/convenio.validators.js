const validator = require('./generic.validators')

const validateConvenio = (user) => {
  const properties = ['nombre_convenio', 'version_convenio', 'programa_acad', 'promedio' , 'cupo',
   'estado_convenio', 'fecha_inicio', 'fecha_final', 'fecha_suscripcion', 'tipo_convenio',
   'tipo_movilidad', 'nombre_institucion' ]
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
 validator.validateAndTransformId(padlock, 'programa_acad', 'El id del programa académico no es valido')
 validator.validateAndTransformId(padlock, 'tipo_convenio', 'El id del tipo de convenio no es valido')
 validator.validateAndTransformId(padlock, 'tipo_movilidad', 'El id del tipo de moviliad no es valido') 
 validator.validateAndTransformId(padlock, 'nombre_institucion', 'El id del nombre institución no es valido') 

 
 

}

module.exports = {
    validateConvenio ,
    transformObjectId,
    ...validator
}
