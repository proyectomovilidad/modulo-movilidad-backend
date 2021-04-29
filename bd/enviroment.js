
const tiposEstado ={
    "e-1": "No inscrito",
    "e0": "Cancelado",
    "e1": "Inscrito",
    "e2": "Carga documentos",
    "e3": "Movilidad",
    "e4": "Finalizado",
    "e5": "Prorroga"
  }

const estadosAdmitido ={
  'e-1': 'Espera',
  'e0': 'No Admitido',
  'e1': 'Admitido'
}

const userRoles = {
  'r1': 'admin',
  'r2': 'estudiante',
  'r3': 'estudianteExterno',
  'r4': 'profesor',
  'r5': 'profesionalRelExt'
}  

module.exports = {
  tiposEstado,
  userRoles
}