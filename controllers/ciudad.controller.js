const model = require("./../models/ciudad.models")
const validator = require('./../validators/ciudad.validators')



/**
 * Save or updates a padlock if it doesn't exist
 *
 */
const saveOrUpdateCiudad= async (req, res, next) => {
    try {
        const id = req.params['_id']
        if (!id) validator.validateCiudad(req.body)
        validator.transformObjectId(req.body)
       const ciudad = await model.saveOrUpdateCiudad(id, req.body)

        res.send(ciudad)
      } catch (e) {
        console.log(e);
      }
} 

const getCiudades = async (req, res, next) => {
  try { 
    const { codigo_departamento } = req.body
      const ciudades = await model.getCiudades(codigo_departamento)
      res.send(ciudades)
    } catch (e) {
      errorUtils.sendErrorResponse(res, e)
    }
}

const deleteCiudad = async (req, res, next) => {
  const id = req.params['_id']
  
   try {

    const ciudad = await ciudad.findById (id) ;

    if (!ciudad) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese id'
      });
    }

    await ciudad.findByIdAndDelete (id) ;

    res.json ({

      ok: true,
      msg: 'Usuario eliminado'
    });


     
   } catch (error) {

    console.log(error)
    res.status(500).json ({

      ok: false,
      msg: 'No se pudo eliminar'
    });
     
   }
}

module.exports = {
    saveOrUpdateCiudad,
    getCiudades,
    deleteCiudad
   
}
    