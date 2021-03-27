const validator = require('./generic.validators')

const validateAspUisAcademic= (user) => {
  const properties = ['programa_acad', 'semestre', 'promedio', 'cred_cursados' , 'cred_cursar',
  'codigo_est', 'periodo_inscrip', 'ano_inscrip', 'fecha_inscripcion', 'sede']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  validator.validateAndTransformId(padlock, 'programa_acad', 'El id de la programa academico no es valido')
  //validator.validateAndTransformId(padlock, 'periodo_inscrip', 'El id del periodo no es valido')
  

}

module.exports = {
    validateAspUisAcademic,
    transformObjectId,
    ...validator
}
