const model = require("./../models/tipoApoyo.models")
const validator = require('./../validators/tipoApoyo.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateApoyo= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateApoyo(req.body)
        validator.transformObjectId(req.body)
       const apoyo = await model.saveOrUpdateApoyo(id, req.body)

        res.send(apoyo)
      } catch (e) {
        console.log(e);
      }
}

const getApoyo = async (req, res, next) => {
  try { 
      const apoyo = await model.getApoyo()
      res.send(apoyo)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const deleteApoyo  = async (req, res, next) =>{
  try { 
    const id = req.params['_id']
     const apoyo = await model.deleteApoyo(id)
     
      res.send(apoyo)
    } catch (e) {
     // errorUtils.sendErrorResponse(res, e)
     console.log(e)
     res.send({message: e.toString(), status: false})

    }
}

const getTipoApoyoById = async (req, res, next) => {
    try{
        const tipoApoyo = await model.getTipoApoyoById(req.params['_id'])
        console.log(req.params['_id'])
        console.log(tipoApoyo)
        let respuesta = {}

        if (tipoApoyo){
            respuesta = {status: true, data: tipoApoyo}
        }else{
            respuesta = {status: false, message: 'No existe registro asociado a ese ID'}
        }
        res.send(respuesta)
    }catch(e){
        res.send({message: e.toStrong(), status: false})
    }
}

const getTipoApoyoByEstrato = async (req, res, next) => {
  try{
    const estratos = req.params['estratos'].split(',');
    const tipo_apoyos = await model.getTipoApoyoByEstrato(estratos)
      res.send({status: true, data: tipo_apoyos})
  }catch (e) {
      res.send({title: 'error!', message: e.toString(), status: false})
  }
}



module.exports = {
    saveOrUpdateApoyo,
    getApoyo,
    deleteApoyo,
    getTipoApoyoByEstrato,
    getTipoApoyoById
}
