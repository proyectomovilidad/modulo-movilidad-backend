const validator = require('./generic.validators')

const validateProfesores = (user) => {
  const properties = ['primer_nombre', 'primer_apellido', 'genero','nombre_convocatoria' ,'actividad',
   'duracion', 'financiacion', 'tipo_recursos' , 'tipo_doc_id', 'documento_id','periodo_inscrip', 
   'ano_inscrip', 'fecha_inscripcion', 'celular', 'correo']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
   validator.validateAndTransformId(padlock, 'tipo_doc_id', 'El id del tipo de documento esta no es valido')
   validator.validateAndTransformId(padlock, 'nombre_convocatoria', 'El id del tipo del nombre de la convocaoria no es valido')

   //validator.validateAndTransformId(padlock, 'periodo', 'El id del periodo no es valido')
 
}

module.exports = {
    validateProfesores,
    transformObjectId,
    ...validator
}

