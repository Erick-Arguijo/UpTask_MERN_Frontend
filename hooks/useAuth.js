import AuthContext from '@/context/AuthProvider'

import React, { useContext } from 'react'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth