const model = require("./../models/entornoMovilidad.models")
const modelConvenio = require('../models/convenio.models')
const modelAsUisPersonal = require('../models/aspUisPersonal.models')
const modelAspExtPersonal = require('../models/aspExtPersonal.models')
const modelInscripcion = require('../models/inscripcion.models')
const validator = require('./../validators/entornoMovilidad.validators')
const { ObjectId } = require('mongodb')

const cron = require('node-cron')

/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateFechasMovSaliente= async (req, res, next) => {
    try {
      console.log('input: ',req.body  )
        const id = req.params['_id']
        if (!id) validator.validateEntornoMovilidad(req.body)
        validator.transformObjectId(req.body)
       const movilidadSaliente = await model.saveOrUpdateFechasMovSaliente(id, req.body)

        res.send(movilidadSaliente)
      } catch (e) {
        console.log(e);
      }
} 


//guardar fechas
const saveFechasMovilidad = async (req, res, next) => {
  try {
    console.log(req.body)
    //validator.validateEntornoMovilidad(req.body)

    const fechasMovilidad = await model.saveFechasMovilidad(req.body)
    if(fechasMovilidad[0]){
      const fechaFin = new Date(fechasMovilidad[0].fecha_final.toString())
      let dia = fechaFin.getDate()
      let mes = fechaFin.getMonth() + 1
      
      const task = cron.schedule(`* * ${dia} ${mes} *`,async ()=>{
        const convenios = await modelConvenio.consultarConvenios({'convenio.estado_convenio': 'activo'})
        
        convenios.forEach(async element=>{
          const promedioC = element.convenio.promedio
          const cupoMax = element.convenio.cupo
          let externosPermitidos = 0
          let estudiantesPermitidos = 0
          
          if(fechasMovilidad[0].tipo == 0){
            let estudiantes = await modelAsUisPersonal.consultarEstudiantes({'Inscripcion.nombre_convenio': String(element._id)})          
            
            let estudiantesSort = estudiantes.sort((a,b)=>{
              let promedioA = a.aspUisAcademic.promedio
              let promedioB = b.aspUisAcademic.promedio 
              return (promedioA > promedioB) ? -1 : (promedioA < promedioB) ? 1 : 0
            })
             
            try{
              estudiantesSort.forEach(estudiante=>{
                
                if(estudiante.aspUisAcademic.promedio >= promedioC && estudiantesPermitidos <= cupoMax){
                  modelInscripcion.saveOrUpdateInscripcion(estudiante.Inscripcion._id, {admitido: 1, estado: '3'})
                  estudiantesPermitidos+=1
                }else{
                  modelInscripcion.saveOrUpdateInscripcion(estudiante.Inscripcion._id, {admitido: 0})
                }          
              })            
            }catch(e){console.log(e)}            
          }

          if(fechasMovilidad[0].tipo == 1){
            let externos = await modelAspExtPersonal.consultarExternos({
              'Inscripcion.nombre_convenio': String(element._id)
            })     

            let externosSort = externos.sort((a,b)=>{
              let promedioA = a.aspExtAcademic.promedio
              let promedioB = b.aspExtAcademic.promedio 
              return (promedioA > promedioB) ? -1 : (promedioA < promedioB) ? 1 : 0
            })

            try{
              externosSort.forEach(externo=>{
                
                if(externo.aspExtAcademic.promedio >= promedioC && externosPermitidos <= cupoMax){
                  modelInscripcion.saveOrUpdateInscripcion(externo.Inscripcion._id, {admitido: 1, estado: '3'})
                  externosPermitidos+=1
                }else{
                  modelInscripcion.saveOrUpdateInscripcion(externo.Inscripcion._id, {admitido: 0})
                }          
              })            
            }catch(e){console.log(e)}                  
          }

        }) 
      })
    }

    res.send(fechasMovilidad)
  } catch (e) { 
    let msg = "error: " + e.toString()
    res.send({message: msg,  status: false})
  }
} 

const updateFechasMovilidad = async (req, res, next) => {
  try {
    validator.validateEntornoMovilidad(req.body)
    
    const fechasMovilidad = await model.updateFechasMovilidad(req.params._id,req.body)

    res.send(fechasMovilidad)
    } catch (e) {
      let msg = "error: " + e
      res.send({message: msg,  status: false})
    }
} 


const saveOrUpdateFechasMovEntrante= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateEntornoMovilidad(req.body)
        validator.transformObjectId(req.body)
       const movilidadEntrante = await model.saveOrUpdateFechasMovEntrante(id, req.body)

        res.send(movilidadEntrante)
      } catch (e) {
        console.log(e);
      }
}


//obtener todas fechas
const getFechasMovilidad = async (req, res, next) =>{
  try{
    const fechasMovEntrante = await model.getFechasMovEntrante()
    res.send(fechasMovEntrante)
  }catch(e){
    let msg = "error: " + e
    res.send({message: msg,  status: false})
  }
}


//obtener fechas por tipo y periodo
const getFechasByStatus = async (req, res, next) =>{
  try{
    const data = {periodo: req.params.periodo, tipo: req.params.tipo }
    const fechasMovilidad = await model.getFechasMovByStatus(data)
    console.log('fechas ',data)
    console.log('fechas ',fechasMovilidad)
    res.send(fechasMovilidad)
  }catch(e){
    let msg = "error: " + e.toString()
    res.send({message: msg,  status: false})
  }
}


module.exports = {
    saveOrUpdateFechasMovSaliente,
    saveFechasMovilidad,
    updateFechasMovilidad,
    getFechasMovilidad,
    getFechasByStatus   
}

// tipo 0 = saliente
//tipo 1 = entrante    