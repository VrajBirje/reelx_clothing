import React from "react"

const ClerkLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="h-full flex items-center justify-center pt-40 pb-20">{children}</div>
  )
}

export default ClerkLayout