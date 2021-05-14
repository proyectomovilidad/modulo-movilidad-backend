const model = require("./../models/tipoDocumento.models")
const validator = require('./../validators/tipoDocumento.validators')
 const { ObjectId } = require('mongodb')


/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateDocumento= async (req, res, next) => {
    try {

        const id = req.params['_id']
        if (!id) validator.validateDocumento(req.body)
        validator.transformObjectId(req.body)
       const documento = await model.saveOrUpdateDocumento(id, req.body)

        res.send(documento)
      } catch (e) {
        console.log(e);
      }
}

const getDocumentoByConvenio = async ( req, res, next)=>{
  try{
    id = req.params._id
    const documentos = await model.getDocumentoByConvenio(id)

    res.send({status: true, data: documentos})
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const getDocumento = async (req, res, next) => {
  try { 
      const documento = await model.getDocumento()
      res.send({status: true, data: documento})
    } catch (e) {
      res.send({message: e.toString(), status: false})
    }
}

const getTipoDocumentoConvenios = async (req, res, next)=>{
  try{
    const documentos = await model.getTipoDocumentoConvenios()
    res.send({status: true, data: documentos})
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const saveTipoDocumentoConvenio = async (req, res, next)=>{
  try{    
    const data ={
      documento_id: new ObjectId(req.body.documento_id),
      convenio_id: new ObjectId(req.body.convenio_id)
    }
    const documento = await model.saveTipoDocumentoConvenio(data)
    res.send({status: true, data: documento})
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const removeTipoDocumentoConvenio = async (req, res, next)=>{
  try{
    const documento = await model.removeTipoDocumentoConvenio(req.params._id)
    res.send({status: true, data: documento})
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const getDocumentoByConsulta = async (req, res, next)=>{
  try{
    const documentos = await model.getDocumentoByConsulta(req.body)
    res.send({status: true, data: documentos})
  }catch(e){
    res.send({meesage: e.toString(), status: false})
  }
}


module.exports = {
  saveOrUpdateDocumento,
  getDocumento,
  getDocumentoByConvenio,
  getTipoDocumentoConvenios,
  saveTipoDocumentoConvenio,
  removeTipoDocumentoConvenio,
  getDocumentoByConsulta
}
    