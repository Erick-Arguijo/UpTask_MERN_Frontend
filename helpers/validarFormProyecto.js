import validator from 'validator';

export const validarFormProyecto = (values) => {
    const { nombre, descripcion, entrega, cliente } = values

    if (validator.isEmpty(nombre)) {
        return {ok:false, campo:'nombre', msj:'Nombre del proyecto es requerido'}
    }

    if (validator.isEmpty(descripcion)) {
        return {ok:false, campo:'descripcion', msj:'Descripción del proyecto es requerido'}
    }

    if (!validator.isDate(entrega) || !validator.isAfter(entrega, Date().toString())) {
        return {ok:false, campo:'entrega', msj:'Fecha de entrega no válida'}
    }

    if (validator.isEmpty(cliente)) {
        return {ok:false, campo:'cliente', msj:'Nombre del cliente del proyecto es requerido'}
    }
  
    return {}
}
