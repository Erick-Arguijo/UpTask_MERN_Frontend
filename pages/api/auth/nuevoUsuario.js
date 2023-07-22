import clienteAxios from "@/api/clienteAxios";

const nuevoUsuario = async (req, res) =>{
   
    if (req.method === 'POST') {
        //console.log(req.body);
        //console.log(`${process.env.API_URL}/auth/nuevoUsuario`)
        try {
            const {data} = await clienteAxios.post('/auth/nuevoUsuario', req.body)
            if (data.ok) {
                return res.status(200).json(data)
            }
            
        } catch (error) {
            //console.log(error.response.data)
            return res.status(400).json(error.response.data)
        }
    }


  }

  export default nuevoUsuario

 // export const config = {
 //   api: {
 //     externalResolver: true,
 //   },
 // }
  

