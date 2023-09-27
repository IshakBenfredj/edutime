/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaComment } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';

import { CourseworkContext } from '../../context/courseworkContext';
import Loading from '../../components/loading/Loading';
import NotFound from '../../components/not found/NotFound';
import url from '../../constants/url';

import './details.css';
import UserContext from '../../context/userContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Title from '../../components/title/Title';
import { CommentsContext } from '../../context/commentsContext';
import Comment from '../../components/comment/Comment';
import { ReservationsContext } from '../../context/reservationContext';
import Popup from '../../components/popup/Popup';

const CourseworkDetails = () => {
    const { id } = useParams();
    const { user, centers, usersLoading } = useContext(UserContext);
    const { courseworks, loading } = useContext(CourseworkContext);
    const { comments, loadingComments, setReloadComments } = useContext(CommentsContext);
    const [ownComments, setOwnComments] = useState([]);
    const [comment, setComment] = useState('');
    const [loadingGet, setLoadingGet] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [coursework, setCoursework] = useState({});
    const [center, setCenter] = useState({});
    const {reservations} = useContext(ReservationsContext)
    const [reservationsLength, setReservationsLength] = useState(0)
    const [popup, setPopup] = useState(false);
    const [popupText, setPopupText] = useState('');


    useEffect(() => {
        const getCourseworks = async () => {
            if (!loading && !usersLoading) {
                const coursework = await courseworks.find(e => e._id === id);
                if (coursework && (coursework.userId === user._id || coursework.activation ) ) {
                    const ownReservations = await reservations.filter(e => e.courseworkId === coursework._id)
                    setReservationsLength(ownReservations.length)
                    setCoursework(coursework);
                    const center = await centers.find(e => e._id === coursework.userId);
                    if (!loadingComments) {
                        const ownComments = await comments.filter(e => e.id === coursework._id)
                        setOwnComments(ownComments)
                    }
                    if (center) {
                        setCenter(center)
                        setLoadingGet(false);
                    } else {
                        setNotFound(true);
                        setLoadingGet(false);
                    }
                } else {
                    setNotFound(true);
                    setLoadingGet(false);
                }
            }
        };
        getCourseworks();
    }, [courseworks, setCoursework, id, loading, usersLoading, centers, loadingComments, comments, reservations]);

    const like = async () => {
        try {
            const response = await axios.post(`${url}coursework/like`, { courseworkId : coursework._id }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            })
            setCoursework(response.data.coursework)
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500)
            toast.error(error.response.data.error, {
                position: toast.POSITION.TOP_LEFT,
            })
        }
    }

    const addComment = async(e) => {
        e.preventDefault()
        if(comment.length !== 0){
            try {
        
                const response = await axios.post(`${url}addComment`, {comment, id:coursework._id}, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }} );
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_LEFT
                }) 
                setComment('')
                setReloadComments(true)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500)
                toast.error(error.response.data.error, {
                    position: toast.POSITION.TOP_LEFT
                })
            }
        } else {
            toast.error('يجب كتابة تعليق', {
                position: toast.POSITION.TOP_LEFT
            })
        }
    };
    return (
        <div className="page">
            { loadingGet ? (
                <Loading />
            ) : notFound ? (
                <NotFound />
            ) : (
            <div className="details">
                <div className="image center relative">
                    <img src={`${url}uploads/${coursework.image}`} alt="" />
                    <h1 className='relative white'>تفاصيل دورة {coursework.name}</h1>
                </div>
                <div className="info center container">
                    <img src={`${url}uploads/${coursework.image}`} alt="" />
                    <div className="coll center">
                        <div className='gray-bg info-card center box-shadow'>
                            <div className='child'>
                                <div className='center'>
                                    <span className="title">مدرب/مركز</span>
                                    <span className="value"><Link to={`/centerDetails/${center.name}/${center._id}`}>{center.name}</Link></span>
                                </div>
                                <div className='center'>
                                    <span className="title">رقم الهاتف</span>
                                    <span className="value"><Link to={`tel:${center.phone}`}>{center.phone}</Link></span>
                                </div>
                                <div className='center'>
                                    <span className="title">فئة الدورة</span>
                                    <span className="value">{coursework.category}</span>
                                </div>
                                <div className='center'>
                                    <span className="title">سعر الدورة</span>
                                    <span className="value">{coursework.price} دج</span>
                                </div>
                            </div>
                            <div className='child'>
                                { user && user._id === coursework.userId &&
                                 <div className='center'>
                                    <span className="title">الحالة</span>
                                    { coursework.activation ? <span className="value green">مفعل</span> :
                                    <span className="value red">غير مفعل</span> }
                                </div>
                                }
                                <div className='center'>
                                    <span className="title">العنوان</span>
                                    <span className="value">{center.address}</span>
                                </div>
                                <div className='center'>
                                    <span className="title">تاريخ البداية</span>
                                    <span className="value">{coursework.dateStart}</span>
                                </div>
                                <div className='center'>
                                    <span className="title">عدد الساعات الإجمالي</span>
                                    <span className="value">{coursework.hours} ساعة</span>
                                </div>
                            </div>
                        </div>
                        <div className="counts center">
                        <div className="count gray-bg text-color box-shadow center">
                            <BsPeopleFill className='people' />
                            <p>{reservationsLength} طالب</p>
                        </div>
                        <div className="count gray-bg text-color box-shadow center">
                            <FaComment className='comment' />
                            <p>{ownComments.length} تعليق</p>
                        </div>
                        <div className="count gray-bg text-color box-shadow center">
                            <AiFillHeart className='like' />
                            <p>{coursework.likes.length} توصية</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="center react container">
                    { user && coursework.likes.length !== 0 && coursework.likes.includes(user._id) ?
                    <div className="like gray-bg box-shadow green-bg" onClick={like}>
                        <p className='text-color'>
                            لقد أوصيت بهذه الدورة
                        </p>
                        <AiFillHeart />
                    </div> : user && 
                    <div className="like gray-bg box-shadow red-bg" onClick={like}>
                        <p className='text-color'>
                            هل تريد التوصية بهذه الدورة ؟   
                        </p>
                        <AiOutlineHeart />
                    </div>
                    } 
                    {
                        !user && 
                        <div className="like gray-bg box-shadow red-bg" onClick={()=>{setPopup(true);setPopupText('التفاعل')}}>
                            <p className='text-color'>
                                هل تريد التوصية بهذه الدورة ؟   
                            </p>
                            <AiOutlineHeart />
                        </div>
                    }
                    { user && user.type === 'user' && <div className="buttons center">
                        <Link to={`/reserve/${coursework.name}/${coursework._id}`} className="main-btn center reserve-btn">أحجز الآن</Link>
                    </div> }
                    { !user && <div className="buttons center">
                        <div onClick={()=>{setPopup(true);setPopupText('الحجز')}} className="main-btn center reserve-btn">أحجز الآن</div>
                    </div> }
                </div>
                <pre className='gray-bg text-color box-shadow container'>
                    {coursework.description}
                </pre>
                <div className="comments" id='comments'>
                    <Title title={'التعليقات'} />
                    <form className="gray-bg box-shadow" onSubmit={addComment}>
                        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder='التعليق'></textarea>
                        { user && <button className="main-btn">تعليق</button>}
                        { !user && <Link to={'/auth'} className="main-btn">تسجيل الدخول للتعليق</Link> }
                    </form>
                    <div className="all-comments">
                    {
                        loadingComments ? <Loading /> : ownComments.length !== 0 ?
                        ownComments.map(comment=>(
                            <Comment key={comment._id} comment={comment} />
                        ))
                        : <h1 className='fw-bold center text-color'>لايوجد تعليقات</h1>
                    }
                    </div>
                </div>
            </div>
            )}
            { popup && <Popup setClose={setPopup} text={popupText} />}
        </div>
    );
};

export default CourseworkDetails;