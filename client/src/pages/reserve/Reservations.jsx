import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/Title'
import UserContext from '../../context/userContext'
import { ReservationsContext } from '../../context/reservationContext'
import Loading from '../../components/loading/Loading'
import ReservationCard from '../../components/main cards/ReservationCard'

const Reservations = () => {
    const { user, userLoading } = useContext(UserContext)
    const { reservations, loadingReservation } = useContext(ReservationsContext)
    const [ filterReservations, setFilter ] = useState([])
    const [reservationEtat, setReservationEtat] = useState('wait')
    useEffect(()=>{
        const filterRes = async () => {
            if (!loadingReservation && !userLoading) {
                const filter = await reservations.filter( e => e.centerId === user._id && e.etat === reservationEtat)
                setFilter(filter)
            }
        }
        filterRes()
    },[loadingReservation, reservationEtat, reservations, user, userLoading])
  return (
    <div className="reserve container">
        <Title title={'طلبات الحجز'} />
        <div className="center gap-3 mb-3">
            <button onClick={() => setReservationEtat('wait')} className={`main-btn ${reservationEtat !== 'wait' && 'outline'}`}>قيد الانتظار</button>
            <button onClick={() => setReservationEtat('accept')} className={`main-btn ${reservationEtat !== 'accept' && 'outline'}`}>المقبولة</button>
            <button onClick={() => setReservationEtat('refuse')} className={`main-btn ${reservationEtat !== 'refuse' && 'outline'}`}>المرفوضة</button>
        </div>
        <div className="all center gap-3 container">
            {
                ( loadingReservation || userLoading ) ? <Loading /> : filterReservations.length ?
                filterReservations.map( (e,i) => <ReservationCard key={e._id} newRes={i<localStorage.getItem('notifyCount')} data={e} reservationEtat={reservationEtat} /> )
                : <h1 className='fw-bold center text-color'>لا يوجد أي طلبات لحد الآن</h1>
            }
        </div>
    </div>
  )
}

export default Reservations