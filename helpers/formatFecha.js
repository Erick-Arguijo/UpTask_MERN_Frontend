import React from 'react'

export const formatFecha = (fecha) => {
    const fechaNueva = new Date(fecha)
    let semanaEnMilisegundos = 1000 * 60 * 60 * 24;
    let suma = fechaNueva.getTime() + semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
    let fechaDentroDeUnaSemana = new Date(suma)

    const fechaLarga= fechaDentroDeUnaSemana.toLocaleString("es-ES" ,
	{day: "2-digit", month: "long", year: "numeric"});

 
    return fechaLarga
}
