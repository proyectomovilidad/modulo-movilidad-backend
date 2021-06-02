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
     res.send(apoyo)

    }
}




module.exports = {
    saveOrUpdateApoyo,
    getApoyo,
    deleteApoyo
   
   
}
    