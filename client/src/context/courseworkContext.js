
import { createContext, useContext, useEffect, useState } from 'react';
import url from '../constants/url';
import axios from 'axios';
import UserContext from './userContext';

export const CourseworkContext = createContext();

const CourseworkContextProvider = ({ children }) => {


    const [loading, setLoading] = useState(true)
    const [courseworks, setCourseworks] = useState([])
    const [reloadCourseworks, setReloadCourseworks] = useState(true)
    const { user } = useContext(UserContext)

    useEffect(()=>{
        const handleGetCourseworks = async ()=>{
            await axios.get(`${url}updateCourseworksPayment`);
            const response = await axios.get(`${url}getCourseworks`);
            setCourseworks(response.data.courseworks)
            setLoading(false)
        }
        // handleGetCourseworks()
        if (reloadCourseworks) {
            handleGetCourseworks()
            setReloadCourseworks(false)
        }
    },[courseworks, reloadCourseworks, user])

  return (
    <CourseworkContext.Provider value={{ courseworks, setCourseworks, setReloadCourseworks, loading }}>
        {children}
    </CourseworkContext.Provider>
  )
}

export default CourseworkContextProvider

