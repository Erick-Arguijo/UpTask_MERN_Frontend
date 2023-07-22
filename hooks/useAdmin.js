import useAuth from "./useAuth"
import useProject from "./useProject"

const useAdmin = () => {
    const { usuario } = useAuth() 
    const {proyecto} = useProject()

    return usuario.usuario?._id === proyecto.creador
}

export default useAdmin