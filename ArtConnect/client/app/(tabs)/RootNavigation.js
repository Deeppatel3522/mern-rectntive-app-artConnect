import React from 'react'
import { AuthProvider } from '@/context/authContext.js'
import ScreenMenu from '../../components/Menus/ScreenMenu'

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenu/>
    </AuthProvider>
  )
}

export default RootNavigation