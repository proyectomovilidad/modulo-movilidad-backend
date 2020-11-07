const validator = require('./generic.validators')

const validateAspExtAcademic= (user) => {
  const properties = ['programa_acad', 'semestre', 'promedio', 'cred_cursados' , 'cred_cursar',
   'periodo_inscrip', 'ano_inscrip', 'nombre_institucion','fecha', 'prog_acad_uis']
  validator.validateProperties(user, properties)
}

const transformObjectId = (padlock) => {
  validator.validateAndTransformId(padlock, 'prog_acad_uis', 'El id de la ciudad no es valido')
  validator.validateAndTransformId(padlock, 'nombre_institucion', 'El id de la institución no es valido')
  validator.validateAndTransformId(padlock, 'periodo_inscrip', 'El id del periodo de inscripción no es valido')

}



module.exports = {
    validateAspExtAcademic,
    transformObjectId,
    ...validator
}
