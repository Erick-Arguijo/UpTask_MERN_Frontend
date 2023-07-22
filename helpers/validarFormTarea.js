import validator from 'validator';

export const validarFormTarea = (values) => {
    const { nombre,descripcion, fechaEntrega, prioridad} = values

    if (validator.isEmpty(nombre)) {
        return {ok:false, campo:'nombre', msj:'Nombre de la tarea es requerido'}
    }

    if (validator.isEmpty(descripcion)) {
        return {ok:false, campo:'descripcion', msj:'Descripción de la tarea es requerido'}
    }

    if (!validator.isDate(fechaEntrega) || !validator.isAfter(fechaEntrega, Date().toString())) {
        return {ok:false, campo:'fechaEntrega', msj:'Fecha de entrega no válida'}
    }

    if (validator.isEmpty(prioridad)) {
        return {ok:false, campo:'prioridad', msj:'Prioridad de la entrega de la tarea es requerido'}
    }
  
    return {}
}
