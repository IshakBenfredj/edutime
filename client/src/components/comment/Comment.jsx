/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useState } from 'react'
import './comment.css'
import UserContext from '../../context/userContext'
import Loading from '../loading/Loading'
import url from '../../constants/url'
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios'
import { toast } from 'react-toastify'
import { CommentsContext } from '../../context/commentsContext'

const Comment = ({comment}) => {
    const { allUsers, usersLoading, user: mainUser } = useContext(UserContext)
    const { setReloadComments } = useContext(CommentsContext);
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if (!usersLoading && comment) {
            const user = allUsers.find(e => e._id === comment.userId)
            setUser(user)
            setLoading(false)
        }
    },[comment, comment.userId, allUsers, usersLoading])

    const deleteComment = async () => {
        const deleteConfirm = confirm(`هل ترغب في حذف هذا التعليق فعلا`)
        if (deleteConfirm) {
            try {
                const res = await axios.delete(`${url}deleteComment/${comment._id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
                    setReloadComments(true)
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
    <>
    {
        loading ? <Loading /> : user ?
        <div className="gray-bg box-shadow commentContent">
            <div className="center header-comment">
                <div className="center">
                    <img src={`${url}uploads/${user.image}`} alt={user.image} />
                    <p>{user.name}</p>
                </div>
                {mainUser && (comment.userId === mainUser._id || mainUser.type === 'admin') && <AiFillDelete onClick={deleteComment} />}
            </div>
            <div className="textComment">
                {comment.comment}
            </div>
        </div>
        : null
    }
    </>
  )
}

export default Comment