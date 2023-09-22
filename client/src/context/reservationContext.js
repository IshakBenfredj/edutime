import { createContext, useContext, useEffect, useState } from 'react';
import url from '../constants/url';
import axios from 'axios';
import UserContext from './userContext';

export const ReservationsContext = createContext();

const ReservationsProvider = ({ children }) => {

    const [loadingReservation, setLoadingReservation] = useState(true)
    const [reservations, setReservations] = useState([])
    const [reloadReservations, setReloadReservations] = useState(false)
    const { user, userLoading } = useContext(UserContext)

    useEffect(()=>{
        const handleGetComments = async ()=>{
            const response = await axios.get(`${url}getReservations`);
            setReservations(response.data.reservations)
            setLoadingReservation(false)
        }
        handleGetComments()
        if (reloadReservations || user) {
            handleGetComments()
            setReloadReservations(false)
        }
    },[reloadReservations, user, userLoading])

  return (
    <ReservationsContext.Provider value={{ reservations, setReloadReservations, setLoadingReservation, loadingReservation }}>
        {children}
    </ReservationsContext.Provider>
  )
}

export default ReservationsProvider

