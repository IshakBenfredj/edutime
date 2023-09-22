/* eslint-disable no-restricted-globals */
import React, { useContext, useEffect, useState } from 'react'
import { CourseworkContext } from '../../context/courseworkContext'
import Loading from '../loading/Loading'
import UserContext from '../../context/userContext'
import { AiFillCheckCircle, AiFillCloseCircle, AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import url from '../../constants/url'
import { ReservationsContext } from '../../context/reservationContext'
import { toast } from 'react-toastify'

const ReservationCard = ({ data , newRes, reservationEtat }) => {
    const { user } = useContext(UserContext)
    const { courseworks, loading } = useContext(CourseworkContext)
    const { setReloadReservations } = useContext(ReservationsContext)
    const [coursework, setCoursework] = useState()

    useEffect(() => {
        const getCourse = async () => {
            if (!loading) {
                const find = await courseworks.find( e => e._id === data.courseworkId)
                setCoursework(find)
            }
        }
        getCourse()
    },[courseworks, data.courseworkId, loading])

    const deleteReservation = async () => {
        const deleteConfirm = confirm(`هل ترغب في حذف هذا الحجز فعلا`)
        if (deleteConfirm) {
            try {
                const res = await axios.delete(`${url}deleteReservation/${data._id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
                    setReloadReservations(true)
                toast.success(`${res.data.message}`, {
                    position: toast.POSITION.TOP_LEFT,
                })
            } catch (error) {
                toast.error(error.res.data.error, {
                    position: toast.POSITION.TOP_LEFT,
                })
            }
        }
    }
    const acceptRefuseRes = async (etat) => {
        try {
            const res = await axios.put(`${url}accpetRefuseRes/${etat}`,{id: data._id, userId: data.reservator,courseworkId: data.courseworkId }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
                setReloadReservations(true)
            toast.success(`${res.data.message}`, {
                position: toast.POSITION.TOP_LEFT,
            })
        } catch (error) {
            toast.error(error.res.data.error, {
                position: toast.POSITION.TOP_LEFT,
            })
        }
    }

  return (
    <>
    {
        loading ? <Loading /> : coursework &&
        <div className={`${ newRes && 'border-green'} res-card gray-bg box-shadow center`}>
            <div className="res-info">
                <h4>حجز في دورة {coursework.name}</h4>
                <p>{data.name}</p>
                <p>{data.birthday}</p>
                <p>{data.phone}</p>
                <p>{data.email}</p>
                <p>ولاية {data.wilaya}</p>
                {user.type === 'user' &&
                <p>الحالة &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                     className={`btn text-white ${data.etat === 'accept' ? 'btn-success' :
                    data.etat === 'refuse' ? 'btn-danger' : 'btn-info'}`}>
                        {data.etat === 'accept' ? 'مقبول' :
                    data.etat === 'refuse' ? 'مرفوض' : 'قيد الانتظار'}
                    </span>
                </p>
                }
            </div>
            {
            user && user._id === data.reservator &&
            <div className="actions center">
                <AiFillDelete onClick={deleteReservation} />
            </div>
            }
            {
                data.centerId === user._id && 
                (
                    <div className="actions center">
                        { reservationEtat !== 'accept' && <AiFillCheckCircle onClick={()=>acceptRefuseRes('accept')} style={{color: 'green'}} /> }
                        { reservationEtat !== 'refuse' && <AiFillCloseCircle onClick={()=>acceptRefuseRes('refuse')} style={{color: 'red'}} /> }
                        { reservationEtat !== 'wait' && <AiFillDelete onClick={deleteReservation} style={{color: 'red'}} /> }
                    </div>
                )
            }
        </div>
    }
    </>
  )
}

export default ReservationCard