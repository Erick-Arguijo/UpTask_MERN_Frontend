
import validator from 'validator';
export const validarFormulario = (values) => {
    //console.log(values)
    const {nombre, email, password, repetirPassword } = values
    

    if (validator.isEmpty(nombre)) {
        return {ok:false, campo:'nombre', msj:'Nombre Requerido'}
    }
    
    if (!validator.isEmail(email)) {
        return {ok:false, campo:"email", msj:'Correo no Valido'}
    }

    if (!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
        return {ok:false, campo:'password', msj:'Password Insegura'}
    }
    if (password !== repetirPassword) {
        console.log(password)
        console.log(repetirPassword)
        return {ok:false, campo:'repetirPassword', msj:'Las Passwords no Coinciden'}
    }

    return {ok:true, msj:'validacion exitosa'}
}
