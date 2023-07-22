
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
//import { useCookies } from 'react-cookie'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const router = useRouter()
  //  const [cookies, setCookie] = useCookies(['name']);
    const [usuario, setusuario] = useState({autenticado:false, usuario:null})
    const [isLoading, setisLoading] = useState(true)
    const [alerta, setalerta] = useState({})
    
    const login = async (credenciales) =>{
        try {
            const {data} = await axios.post('/api/auth/login', credenciales)
            if (data.ok) {
                localStorage.setItem('token', data.usuario.token)
                //setCookie('token', token)
                setusuario({ autenticado:true, usuario:data.usuario})
                router.push('/proyecto')
                setalerta({})
            }
          } catch (error) {
            //console.log(error)
            setalerta(error.response.data)
          }
    }

    useEffect(() => {
   
        const autenticarUsuario =  async () =>{
            const token = localStorage.getItem('token')
            
            if (!token){
                //router.push('/')
               setusuario({autenticado:false, usuario:null})
                setisLoading(false)
                return 
            }
    
            try {
                const {data} = await axios('/api/auth/perfil',{headers:{token}})
                //console.log(data)
                setusuario({ autenticado:true, usuario:data.usuario})
                //router.push('/proyecto')
                setisLoading(false)
            } catch (error) {
                //console.log(error.response.data)
                setusuario({autenticado:false, usuario:null})
                setisLoading(false)
                router.push('/')
            }
    
        }

        autenticarUsuario()
      
    }, [])
    

        const cerrarSesionAuth = () => {
            setusuario({})
            setalerta({})   
        }



    return (
        <AuthContext.Provider
            value={{
                isLoading,
                usuario,
                alerta,
                login,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )   
}
export {AuthProvider}
export default AuthContext 