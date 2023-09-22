/* eslint-disable no-restricted-globals */
import './cards.css'
import { Link } from 'react-router-dom';
import { BiCalendar, BiCommentDetail } from 'react-icons/bi';
import { TbClockHour7 } from 'react-icons/tb';
import { BsHeart, BsPeople } from 'react-icons/bs';
import url from '../../constants/url';
import { useContext, useEffect, useState } from 'react';
import { CommentsContext } from '../../context/commentsContext';
import { ReservationsContext } from '../../context/reservationContext';
import UserContext from '../../context/userContext';
import { CourseworkContext } from '../../context/courseworkContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourseworkCard = ({data,white}) => {
    const {comments} = useContext(CommentsContext)
    const {user} = useContext(UserContext)
    const { setReloadCourseworks } = useContext(CourseworkContext)
    const {reservations} = useContext(ReservationsContext)
    const [commentsLength, setCommentsLength] = useState(0)
    const [reservationsLength, setReservationsLength] = useState(0)

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // const [isActivationDatePassed, setIsActivationDatePassed] = useState(false);

    // useEffect(() => {
    //   const checkActivationDate = async () => {
    //     try {
    //       const currentDate = Date();
    //       if (data.activationDate !== null && data.activation && data.activationDate <= currentDate) {
    //         setIsActivationDatePassed(true);
    //       }
    //       console.log(isActivationDatePassed)
    //     } catch (error) {
    //       console.error('Error checking activation date:', error);
    //     }
    //   };
  
    //   checkActivationDate();
    // },[]);
  
    // const handleUpdatePayment = async () => {
    //   try {
    //     // You can proceed with updating the payment when isActivationDatePassed is true
    //     if (isActivationDatePassed) {
    //       await axios.put(`${url}updateCourseworksPayment`, { id: data._id });
    //       data.activation = false
    //       data.activationDate = null
    //       setIsActivationDatePassed(false);
    //     } else {
    //       console.log('Payment cannot be updated because activation date has not passed.');
    //     }
    //   } catch (error) {
    //     console.error('Error updating payment:', error);
    //   }
    // };
  
    // // Add an event listener to call handleUpdatePayment when the page is reloaded
    // useEffect(() => {
    //   handleUpdatePayment()
    // },[]);
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    useEffect(() => {
        const getCommentsLength = async () => {
            const ownComments = await comments.filter(e => e.id === data._id)
            setCommentsLength(ownComments.length)
            const ownReservations = await reservations.filter(e => e.courseworkId === data._id)
            setReservationsLength(ownReservations.length)
        }
        getCommentsLength()
    }, [comments, data._id, reservations]);

    const deleteCoursework = async () => {
        const deleteConfirm = confirm(`هل ترغب في حذف دورة ${data.name}`)
        if (deleteConfirm) {
            try {
                const res = await axios.delete(`${url}deleteCoursework/${data._id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
                setReloadCourseworks(true)
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

  return (
    <Link className={`details-card relative center-card ${white ? 'white-bg' : 'gray-bg'}`} to={`/courseworkDetails/${data.name}/${data._id}`}>
            <div className="img">
                <img src={`${url}uploads/${data.image}`} alt="" />
            </div>
            {
            user && (user._id === data.userId || user.type === 'admin') &&
            <div className="actions-btns">
                {user.type === 'center' && <Link to={`/editCoursework/${data._id}`} className="btn btn-success d-block mb-1">تعديل</Link>}
                <Link className="btn btn-danger" onClick={deleteCoursework}>حذف</Link>
            </div>
            }
            <h4 className='center m-2 fw-bold text-color'>{data.name}</h4>
            <p className='center price text-danger fw-bold'> السعر : {data.price} دج</p>
            <div className="center text-color infos">
                <div className="center information">
                    <div className="icon"><BiCalendar /></div>
                    <p>{data.dateStart}</p>
                </div>
                <div className="center information">
                    <div className="icon"><TbClockHour7 /></div>
                    <p>{data.hours} ساعة</p>
                </div>
            </div>
            <div className="infos text-color center">
                <div className="center information">
                    <div className="icon"><BsPeople /></div>
                    <p>{reservationsLength} طالب</p>
                </div>
                <div className="center information">
                    <div className="icon"><BiCommentDetail /></div>
                    <p>{commentsLength} تعليق</p>
                </div>
                <div className="center information">
                    <div className="icon"><BsHeart /></div>
                    <p>{data.likes.length} توصية</p>
                </div>
            </div>
            </Link>
  )
}

export default CourseworkCard