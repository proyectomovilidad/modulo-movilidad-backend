const model = require("./../models/convenio.models")
const validator = require('./../validators/convenio.validators')
const errorUtils = require("./../shared/error.shared")



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateConvenio= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateConvenio(req.body)
        validator.transformObjectId(req.body)
       const convenio = await model.saveOrUpdateConvenio(id, req.body)

        res.send(convenio)
      } catch (e) {
        console.log(e);
      }
}

const getConvenio = async (req, res, next) => {
  try { 
      const convenio = await model.getConvenio()
      res.send(convenio)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


const getConvenioById = async (req, res, next) => {
  try { 
    const convenioId = req.params['_id']
      const convenio = await model.getConvenioById(convenioId)
      res.send(convenio)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getConvenioByTipoMovilidad = async (req, res, next) => {
  try { 
    const tipoMovilidadId = req.params['_id']
    console.log("id", tipoMovilidadId)
      const convenio = await model.getConvenioByTipoMovilidad(tipoMovilidadId)
      res.send(convenio)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const getConvenioByInstitucion = async (req, res, next) => {
  try { 
    const institucion = req.params['_id']
    console.log("id", institucion)
      const convenio = await model.getConvenioByInstitucion(institucion)
      res.send(convenio)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}


const deleteConvenio  = async (req, res, next) =>{
  try { 
    const id = req.params['_id']
     const convenio = await model.deleteConvenio(id)
     
      res.send(convenio)
    } catch (e) {
     // errorUtils.sendErrorResponse(res, e)
     console.log(e)
     res.send(convenio)

    }
}

const getConveniosConsulta = async (req, res, next) => {
  try { 
      const convenio = await model.getConveniosConsulta()
      res.send(convenio)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const consultarConvenios = async (req, res, next) => {
  try {
      
     const convenios = await model.consultarConvenios(req.body)

      res.send(convenios)
    } catch (e) {
      console.log(e);
    }
} 

const getConvenioByProgAcadInstTipoMov = async (req, res, next)=>{
  try{
    const params = req.params
    const convenios = await model.getConvenioByProgAcadInstTipoMov(params.progAcadId, params.instId, params.tipoMovId)

    res.send(convenios)
  }catch(e){
    res.send({message: e, status: false})
  }
}

module.exports = {
  saveOrUpdateConvenio,
  getConvenio,
  getConvenioById,
  deleteConvenio,
  getConvenioByTipoMovilidad,
  getConvenioByInstitucion,
  getConveniosConsulta,
  consultarConvenios,  
  getConvenioByProgAcadInstTipoMov   
}
    