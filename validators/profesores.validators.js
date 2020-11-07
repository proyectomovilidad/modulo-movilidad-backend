const validator = require('./generic.validators')

const validateProfesores = (user) => {
  const properties = ['primer_nombre', 'primer_apellido', 'actividad', 'duracion', 'financiacion', 'tipo_recursos' , 'tipo_doc_id', 
  'documento_id','periodo']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
   validator.validateAndTransformId(padlock, 'tipo_doc_id', 'El id del tipo de documento esta no es valido')
   validator.validateAndTransformId(padlock, 'periodo', 'El id del periodo no es valido')
 
}

module.exports = {
    validateProfesores,
    transformObjectId,
    ...validator
}

