import clienteAxios from '@/api/clienteAxios'
import  cookie   from 'cookie' ;
import { setCookie } from 'cookies-next';


const login = async (req, res) => {
   if (req.method === 'POST') {
     try {
        const {data} = await clienteAxios.post('/auth/inicioSesion', req.body)
        //console.log(data)
        //res.setHeader( 'Set-Cookie' ,  cookie.serialize( 'token' , 'Hola mundo'))
        setCookie('token', data.usuario.token, { req, res, maxAge: 60 * 60 * 24, sameSite:true});
        
        //res.setHeader( 'Set-Cookie' ,  cookie.serialize( 'token' , 'Hola mundo' , { 
        //    httpOnly : true , 
        //    maxAge : 60  *  60  *  24  *  7,  // 1 semana 
        //    sameSite:'strict'
        //  }))
        res.status(200).json(data)
    } catch (error) {
      console.log(error)
        res.status(400).json(error.response.data)
     }
   }
}

export default login