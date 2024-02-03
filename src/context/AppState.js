import React, { useState } from 'react'
import AppContext from "./AppContext";


export default function AppState({ children }) {
     const [userDetails, setuserDetails] = useState({});
  return (
    <AppContext.Provider value={{userDetails,setuserDetails}}>
      {children}
    </AppContext.Provider>
  )
}