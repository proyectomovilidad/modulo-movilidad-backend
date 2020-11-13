const aspExtPersonalRoute = require('./aspExtPersonal.routes')
const aspExtAcademicRoute = require('./aspExtAcademic.routes')
const aspUisPersonalRoute = require('./aspUisPersonal.routes')
const aspUisAcademicRoute = require('./aspUisAcademic.routes')
const cargaDocumentosRoute = require('./cargaDocumentos.routes')
const convenioRoute = require('./convenio.routes')
const encuestaRoute = require('./encuesta.routes')
const profesoresRoute = require('./profesores.routes')
const institucionCooperanteRoute = require('./institucionCooperante.routes')
const solicitudPresentadaRoute = require('./solicitudPresentada.routes')
const tipoEstadoRoute = require('./tipoEstado.routes')
const programaAcademicoRoute = require('./programaAcademico.routes')
const ciudadRoute = require('./ciudad.routes')
const departamentoRoute = require('./departamento.routes')
const paisRoute = require('./pais.routes')
const tipoMovilidadRoute = require('./tipoMovilidad.routes')
const tipoEncuestaRoute = require('./tipoencuesta.routes')
const entidadFinancieraRoute = require('./entidadFinanciera.routes')
const tipoApoyoRoute = require('./tipoApoyo.routes')
const tipoDocIdRoute = require('./tipoDocId.routes')
const tipoDocumentoRoute = require('./tipoDocumento.routes')
const estadoConvenioRoute = require('./estadoConvenio.routes')
const estadoDocRoute = require('./estadoDoc.routes')
const sedeRoute = require('./sede.routes')
const inscripcionRoute = require('./inscripcion.routes')
const preguntasRoute = require('./preguntas.routes')


const routing = (app) => {

    app.use('/aspExtPersonal', aspExtPersonalRoute),
    app.use('/aspExtAcademic', aspExtAcademicRoute),
    app.use('/aspUisPersonal', aspUisPersonalRoute)
    app.use('/aspUisAcademic', aspUisAcademicRoute)
    app.use('/cargaDocumentos', cargaDocumentosRoute),
    app.use('/convenio', convenioRoute),
    app.use('/encuesta', encuestaRoute)
    app.use('/profesores', profesoresRoute)
    app.use('/institucionCooperante', institucionCooperanteRoute)
    app.use( '/solicitudPresentada', solicitudPresentadaRoute)
    app.use('/tipoEstado', tipoEstadoRoute)  
    app.use( '/programaAcademico', programaAcademicoRoute)
    app.use('/ciudad', ciudadRoute),
    app.use('/departamento', departamentoRoute)
    app.use( '/pais', paisRoute)
    app.use('/entidadFinanciera', entidadFinancieraRoute)
    app.use('/estadoConvenio', estadoConvenioRoute)
    app.use('/estadoDoc', estadoDocRoute)
    app.use( '/tipoApoyo', tipoApoyoRoute)
    app.use('/tipoMovilidad', tipoMovilidadRoute)
    app.use('/tipoEncuesta', tipoEncuestaRoute)
    app.use('/tipoDocId', tipoDocIdRoute)
    app.use('/tipoDocumento', tipoDocumentoRoute)
    app.use('/sede', sedeRoute)
    app.use('/inscripcion', inscripcionRoute)
    app.use('/preguntas', preguntasRoute)
    
}


module.exports = routing




