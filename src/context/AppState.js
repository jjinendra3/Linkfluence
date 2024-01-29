import React from 'react'
import AppContext from "./AppContext";


export default function AppState({ children }) {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}