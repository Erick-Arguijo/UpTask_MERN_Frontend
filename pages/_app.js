import { AuthProvider,} from '@/context/AuthProvider'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import useAuth from '@/hooks/useAuth'
import { ProjectProvider } from '@/context/ProjectProvider'
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }) {
  return(
    
      <AuthProvider>
        <ProjectProvider>
          <Component {...pageProps} />
        </ProjectProvider>
      </AuthProvider> 
 
  ) 

}
