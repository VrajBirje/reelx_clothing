import React from 'react'

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='pt-20 md:pt-24 2xl:max-w-screen-xl mx-auto'>
            {children}
    </main>
  )
}

export default MainLayout