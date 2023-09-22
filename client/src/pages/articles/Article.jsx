import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import url from '../../constants/url';
import Loading from '../../components/loading/Loading';
import NotFound from '../../components/not found/NotFound';
import './styles.css'
import { setTitle } from '../../App';
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from 'react-icons/ai';
import { toast } from 'react-toastify';
import UserContext from '../../context/userContext';
import Popup from '../../components/popup/Popup';

const Article = () => {
  const {id} = useParams()
  const { user, userLoading } = useContext(UserContext);
  const [article,setArticle] = useState()
  const [loading,setLoading] = useState(true)
  const [popup, setPopup] = useState(false)
  const [popupText, setPopupText] = useState('')

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(()=>{
    article && setTitle(article.title)
  },[article])

  const like = async () => {
    try {
      const response = await axios.patch(`${url}likeArticle`, {id} , {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`},
      })
      setArticle(response.data.article)
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500)
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_LEFT,
      })
    }
  }
  const disLike = async () => {
    try {
      const response = await axios.patch(`${url}disLikeArticle`, {id} , {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`},
      })
      setArticle(response.data.article)
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500)
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_LEFT,
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}getArticleById/${id}`);
        setArticle(response.data.article);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    };
    fetchData();
  },[id]);
  return (
    <div className="article-details">
      {
        loading ? <Loading /> : !article ? <NotFound /> :
        <>
          <div className="img center relative">
            <img src={`${url}uploads/${article.image}`} alt="" />
            <div className="header-info center">
              <h2 className='text-center fw-bold'>{article.title}</h2>
              <div className="create-info center gap-4">
                <span>EDUTIME TEAM</span>
                <span>{new Intl.DateTimeFormat('ar-AR', dateOptions).format(new Date(article?.createdAt))}</span>
              </div>
            </div>
          </div>
          <pre className='desc container' dangerouslySetInnerHTML={{ __html: article.description }} />
          <div className="article-react text-color">
            {
              userLoading ? <Loading /> : user ?
              <>
                <h3>هل أعجبك المقال ؟</h3>
                <div className="center gap-5">
                  <span>
                  {article.likes.includes(localStorage.getItem('userId')) ? <AiFillLike className='text-danger' onClick={ like } /> : <AiOutlineLike onClick={ like } /> }
                    <span className='react-count'>{article.likes.length}</span>
                  </span>
                  <span>
                  {article.disLikes.includes(localStorage.getItem('userId')) ? <AiFillDislike className='text-danger' onClick={ disLike } /> : <AiOutlineDislike onClick={ disLike } />}
                    <span className='react-count'>{article.disLikes.length}</span>
                  </span>
                </div>
              </> :
              <>
                <h3>هل أعجبك المقال ؟</h3>
                <div className="center gap-5">
                  <span>
                    <AiOutlineLike onClick={()=>{setPopup(true);setPopupText('التفاعل')}} />
                    <span className='react-count'>{article.likes.length}</span>
                  </span>
                  <span>
                    <AiOutlineDislike onClick={()=>{setPopup(true);setPopupText('التفاعل')}} />
                    <span className='react-count'>{article.disLikes.length}</span>
                  </span>
                </div>
              </>
            }
          </div>
        </>
      }
      { popup && <Popup setClose={setPopup} text={popupText} />}
    </div>
  )
}

export default Article