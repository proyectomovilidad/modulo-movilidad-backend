
 const { ObjectId } = require('mongodb')
 const mongoConnector = require('../bd/mongo.db')
 
 
 const saveOrUpdateDocumento  = async (documentoId, documentoBody) => {
   const connection = await mongoConnector
   delete documentoBody._id
   const documento= await connection.collection('tipoDocumento').findOneAndUpdate({
     _id: new ObjectId(documentoId)
   }, {
     $set:documentoBody
   }, {
     upsert: true,
     returnOriginal: false
   })
   return documento.value
 }
 
 const getDocumento = async ()=> {
   const connection = await mongoConnector
   let aggregate = []
   
   const documento = await connection.collection('tipoDocumento').find({}).toArray() // Devuelve la respuesta como un array de objetos
   return documento
 }

  const getDocumentoByConvenio = async (id)=>{
    const connection = await mongoConnector

    const aggregate = [
      {
        $project: {
          'tipoDocumento': '$$ROOT'
        }
      },
      {
        $lookup: {
          from: 'tipoDocumentoConvenio',
          localField: 'tipoDocumento._id',
          foreignField: 'documento_id',
          as: 'Documento'
        }
      },
      {
        $lookup: {
          from: 'convenio',
          localField: 'Documento.convenio_id',
          foreignField: '_id',
          as: 'convenios'
        }
      },
      {
        $match: {
          'convenios._id': new ObjectId(id)
        }
      }
    ]
  //deleteAll()

    const documentos = await connection.collection('tipoDocumento').aggregate(aggregate).toArray() // Devuelve la respuesta como un array de objetos
    return documentos
  }

  const getDocumentoByConsulta = async (consulta)=>{
    const connection = await mongoConnector

    const aggregate =[
      {
        $project: {
          'tipoDocumento': '$$ROOT'
        }
      },
      {
        $lookup: {
          from: 'tipoDocumentoConvenio',
          localField: 'tipoDocumento._id',
          foreignField: 'documento_id',
          as: 'documentoConvenio'
        }
      },
      {
        $lookup: {
          from: 'convenio',
          localField: 'documentoConvenio.convenio_id',
          foreignField: '_id',
          as: 'convenios'
        }
      },
      {
        $match: transformarConsulta(consulta)
      }
    ]

    const documentos = await connection.collection('tipoDocumento').aggregate(aggregate).toArray()
     return documentos
  }


 const deleteAll = async () => {
   const connection = await mongoConnector

   const aspExtPersonal = await connection.collection('tipoDocumentoConvenio').remove({}, function(err, obj) {
     if (err) return {message: err, document:null};
     return {document: obj.document_id, message: "El documento ha sido eliminado", status: true}
   });
   return "Error 500";
 }

 const saveTipoDocumentoConvenio = async (data)=>{
   const connection = await mongoConnector
   const exists = await connection.collection('tipoDocumentoConvenio').find(data).toArray()
   if(exists.length > 0) return [];
   const documentoConvenio = await connection.collection('tipoDocumentoConvenio').insertOne(data)
   return documentoConvenio
 }

 const getTipoDocumentoConvenios = async ()=>{
   const connection = await mongoConnector
   const documentos = await connection.collection('tipoDocumentoConvenio').find({}).toArray()
   return documentos
 }

 const removeTipoDocumentoConvenio = async (id)=>{
   const connection = await mongoConnector

   const documento = await connection.collection('tipoDocumentoConvenio').remove({_id: new ObjectId(id)}, function(err, obj) {
     if (err) return {message: err, document:null};
     return {document: obj.document_id, message: "El documento ha sido eliminado", status: true}
   });
   return "Error 500";
 }

 function transformarConsulta(consulta) {

   const nuevaConsulta = {}
   for (c in consulta) {

     if (consulta[c]) {
       if (c.includes("._id")) {
         nuevaConsulta[`${c}`] = new ObjectId(consulta[c]);
       } else {
         nuevaConsulta[`${c}`] = consulta[c];
       }
     }
   }
   return nuevaConsulta

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