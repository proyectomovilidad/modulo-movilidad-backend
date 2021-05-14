const model = require("./../models/cargaDocumentos.models")
const validator = require('./../validators/cargaDocumentos.validators')
const fs = require('fs-extra')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateCargaDocumentos= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validatecargaDocumentos(req.body)
        validator.transformObjectId(req.body)
       const cargaDocumentos = await model.saveOrUpdateCargaDocumentos(id, req.body)

        res.send(cargaDocumentos)
      } catch (e) {
        console.log(e);
      }
}

const eliminarDocumentoByNombre = async (req, res, next)=>{
  try{
    const fileName = req.params.fileName

    let target_path = `${__dirname}/../uploadFiles/${fileName}`


    fs.unlink(target_path, (err) => {  
      if(err){
        return res.send({message: err.toString(), status: false})
      }
    });

    res.send({message: 'eliminado', status: true})
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}


const getCargaDocumentosByNumeroInscripcion = async (req, res, next) => {
  try { 
    const numeroInscripcionId = req.params['_id']
      const cargaDocumentos = await model.getCargaDocumentosByNumeroInscripcion(numeroInscripcionId)
      res.send(cargaDocumentos)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const saveDocumentoFile = async (req, res, next)=>{
  try{  
    console.log('aaca')  
    let file = req.files.file
    let temp_path = file.path
    let target_path = `${__dirname}/../uploadFiles/${file.name}`

    fs.copy((temp_path), target_path).then(()=>{
      console.log('correcto: ')     
    }).catch(err => {
      console.log('error guardando: ', err)
    })

    res.send({message: 'Documento Guardado', status: true})
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const getDocumentosByNombre = async (req, res, next)=>{
  try{
    res.download(__dirname+'/../uploadFiles/'+req.params.fileName, req.params.fileName, err=>{
      if(err){
        console.log(err)
        res.send({message: 'Documento no existe', status: false})
      }
    })
  }catch(e){
    res.send({message: e.toString(), status: false})
  }
}

const getDocumentos = async (req, res, next)=>{
  try{
    const documentos = model.getDocumentos()
    res.send(documentos)
  }catch(e){
    console.log(e)
    res.send({message: e.toString(), status: false})
  }
}

module.exports = {
  saveOrUpdateCargaDocumentos,
  getCargaDocumentosByNumeroInscripcion,
  getDocumentos,
  saveDocumentoFile,
  getDocumentosByNombre,
  eliminarDocumentoByNombre
}