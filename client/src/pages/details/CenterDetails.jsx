import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import CourseworkCard from '../../components/main cards/CourseworkCard';
import Popup from '../../components/popup/Popup';

const CenterDetails = ({id}) => {
    const { courseworks, loading } = useContext(CourseworkContext);
    const { comments, loadingComments, setReloadComments } = useContext(CommentsContext);
    const { user, centers, usersLoading, setReloadUsers } = useContext(UserContext);
    const [comment, setComment] = useState('');
    const [ownComments, setOwnComments] = useState([]);
    const [loadingGet, setLoadingGet] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [centerCourseworks, setCourseworks] = useState([]);
    const [center, setCenter] = useState({});
    const [popup, setPopup] = useState(false);
    const [popupText, setPopupText] = useState('');

    useEffect(() => {
        const getCenter = async () => {
            if (!loading && !usersLoading) {
                const center = await centers.find(e => e._id === id);
                if (center) {
                    setCenter(center);
                    const courseworksArray = await courseworks.filter(e => e.userId === center._id && e.activation);
                    setCourseworks(courseworksArray)
                    setLoadingGet(false);
                    if (!loadingComments) {
                        const ownComments = await comments.filter(e => e.id === center._id)
                        setOwnComments(ownComments)
                    }
                } else {
                    setNotFound(true);
                    setLoadingGet(false);
                }
            }
        };
        getCenter();
    }, [courseworks, setCourseworks, id, loading, usersLoading, centers, loadingComments, comments]);

    const like = async () => {
        try {
            const response = await axios.post(`${url}center/like`, {centerId : center._id} , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            })
            setReloadUsers(true)
            setCenter(response.data.center)
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
                const response = await axios.post(`${url}addComment`, {comment, id:center._id}, {
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
            {loadingGet ? (
                <Loading />
            ) : notFound ? (
                <NotFound />
            ) : (
                <div className="details centerDet">
                    <div className="image center relative">
                        <img src={`${url}uploads/${center.image}`} alt="" />
                        <h1 className='relative white'>تفاصيل مركز {center.name}</h1>
                    </div>
                    <div className="info center container">
                        <img src={`${url}uploads/${center.image}`} alt="" />
                        <div className="coll center">
                            <div className="gray-bg info-card center box-shadow">
                                <div className="child u">
                                    <div className='center'>
                                        <span className="title">إسم المدرب/المركز</span>
                                        <span className="value">{center.name}</span>
                                    </div>
                                    <div className='center'>
                                        <span className="title">رقم الهاتف</span>
                                        <span className="value"><Link to={`tel:${center.phone}`}>{center.phone}</Link></span>
                                    </div>
                                    <div className='center'>
                                        <span className="title">البريد الإلكتروني</span>
                                        <span className="value"><Link to={`mailto:${center.email}`}>{center.email}</Link></span>
                                    </div>
                                    <div className='center'>
                                        <span className="title">العنوان</span>
                                        <span className="value">{center.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="counts center">
                                <div className="count gray-bg text-color box-shadow center">
                                    <BsPeopleFill className='people' />
                                    <p>{centerCourseworks.length} دورات</p>
                                </div>
                                <div className="count gray-bg text-color box-shadow center">
                                    <FaComment className='comment' />
                                    <p>{ownComments.length} تعليق</p>
                                </div>
                                <div className="count gray-bg text-color box-shadow center">
                                    <AiFillHeart className='like' />
                                    <p>{center.likes.length} توصية</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        user && <div className="center react container">
                        { center.likes.length !== 0 && center.likes.includes(user._id) ?
                        <div className="like gray-bg box-shadow green-bg" onClick={like}>
                            <p className='text-color'>
                                لقد أوصيت بهذا المركز/المدرب
                            </p>
                            <AiFillHeart />
                        </div> :
                        <div className="like gray-bg box-shadow red-bg" onClick={like}>
                            <p className='text-color'>
                                هل تريد التوصية بهذا المركز/المدرب ؟
                            </p>
                            <AiOutlineHeart />
                        </div>
                        }
                    </div>
                    }
                    {
                    !user &&
                    <div className="center react container">
                        <div className="like gray-bg box-shadow red-bg" onClick={()=>{setPopup(true);setPopupText('التفاعل')}}>
                            <p className='text-color'>
                                هل تريد التوصية بهذا المركز/المدرب ؟
                            </p>
                            <AiOutlineHeart />
                        </div>
                    </div>
                    }
                    <section className="courseworks gray-bg">
                        <div className="container">
                            <Title title={'الدورات'} />
                            <div className="cards center">
                            {
                                centerCourseworks.length ?
                                centerCourseworks.map(e => (
                                        <div className="card" key={e._id}>
                                            <CourseworkCard white data={e} />
                                        </div>
                                    ))
                                : <h1 className='fw-bold center text-color'>لايوجد دورات</h1>
                            }
                            </div>
                        </div>
                    </section>
                    <div className="comments">
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

export default CenterDetails;