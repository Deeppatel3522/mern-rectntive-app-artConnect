import React from 'react'
import { AuthProvider } from '@/context/authContext.js'
import { PostProvider } from '@/context/postContext.js'
import ScreenMenu from '../../components/Menus/ScreenMenu'

const RootNavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  )
}

export default RootNavigation