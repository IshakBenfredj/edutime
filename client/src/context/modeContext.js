import { createContext, useEffect, useState } from 'react';

export const ModeContext = createContext();

const ModeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('')
    const [reloadMode, setReloadMode] = useState(false)
    const getMode = ()=>{
        if (localStorage.getItem('mode')) {
            setMode(localStorage.getItem('mode'))
        } else {
            setMode('light')
        }
    }
    useEffect(()=>{
        getMode()
        if (reloadMode) {
            getMode()
            setReloadMode(false)
        }
        if (mode === 'night') {
            document.querySelector('body').classList.add('night')
        } else {
            document.querySelector('body').classList.remove('night')
        }
    },[mode, reloadMode])
  return (
    <ModeContext.Provider value={{ mode, setReloadMode }}>
        {children}
    </ModeContext.Provider>
  )
}

export default ModeContextProvider