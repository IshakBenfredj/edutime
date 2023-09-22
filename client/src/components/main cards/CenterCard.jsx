/* eslint-disable no-restricted-globals */
import './cards.css'
import { Link } from 'react-router-dom';
import { BiCommentDetail } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';
import { PiBooksDuotone } from 'react-icons/pi';
import { BsHeart } from 'react-icons/bs';
import url from '../../constants/url';
import { useContext, useEffect, useState } from 'react';
import { CommentsContext } from '../../context/commentsContext';
import { CourseworkContext } from '../../context/courseworkContext';
import UserContext from '../../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CenterCard = ({data,white,student,setId}) => {
    const {comments} = useContext(CommentsContext)
    const {courseworks} = useContext(CourseworkContext)
    const [commentsLength, setCommentsLength] = useState(0)
    const [courseworksLength, setCourseworksLength] = useState(0)
    const {user,setReloadUsers} = useContext(UserContext)

    useEffect(() => {
        const getCommentsLength = async () => {
            const ownComments = await comments.filter(e => e.id === data._id)
            setCommentsLength(ownComments.length)
            const ownReservations = await courseworks.filter(e => e.userId === data._id)
            setCourseworksLength(ownReservations.length)
        }
        getCommentsLength()
    }, [comments, courseworks, data._id]);

    const deleteCenter = async () => {
        const deleteConfirm = confirm(`هل ترغب في حذف ${data.name}`)
        if (deleteConfirm) {
            try {
                const res = await axios.delete(`${url}deleteCenter/${data._id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
                setReloadUsers(true)
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
    <Link onClick={()=> setId(data._id) } className={`details-card relative center-card ${white ? 'white-bg' : 'gray-bg'}`} to={!student && `/centerDetails/${data.name}`}>
        <div className="img">
            <img src={`${url}uploads/${data.image}`} alt="" />
        </div>
        {
        user && user.type === 'admin' &&
        <div className="actions-btns">
            <Link className="btn btn-danger" onClick={deleteCenter}>حذف</Link>
        </div>
        }
        <h4 className='center m-2 fw-bold text-color'>{data.name}</h4>
        <p className='center address-icon text-danger fw-bold'> <FaLocationDot /> </p>
        <div className="center text-color mb-2 address">
            {data.address}
        </div>
        {
            !student &&
            <div className="infos text-color center">
            <div className="center information">
                <div className="icon"><PiBooksDuotone /></div>
                <p>{courseworksLength} دورة</p>
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
        }
    </Link>
  )
}

export default CenterCard