/* eslint-disable no-restricted-globals */
import { Link } from 'react-router-dom'
import url from '../../constants/url'
import { useContext } from 'react';
import UserContext from '../../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles.css'

const ArticleCard = ({article,setReload}) => {
  const { user } = useContext(UserContext);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('ar-AR', dateOptions).format(new Date(article.createdAt));

  const deleteArticle = async () => {
    const deleteConfirm = confirm(`هل ترغب في حذف هذا المقال فعلا`)
    if (deleteConfirm) {
      try {
        const res = await axios.delete(`${url}deleteArticle/${article._id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
        toast.success(`${res.data.message}`, {
          position: toast.POSITION.TOP_LEFT,
        })
        setReload(true)
      } catch (error) {
        toast.error(error.res.data.error, {
          position: toast.POSITION.TOP_LEFT,
        })
      }
    }
}

  return (
    <div className="article-card box-shadow gray-bg">
      <img src={`${url}uploads/${article.image}`} alt="" />
      <span className='date'>{formattedDate}</span>
      <div className="info">
        <h5>{article.title}</h5>
        <pre dangerouslySetInnerHTML={{ __html:` ${article.description.slice(0,100)} ${article.description.length > 200 ? '...' : '' }` }} />
        {/* <p>{article.description.slice(0,100)} {article.description.length > 200 && '...'}</p> */}
        <div className="center">
          <Link to={`/article_details/${article._id}`} className={`main-btn ${user && user.type !== 'admin' && 'w-full'}`}>التفاصيل</Link>
          { user && user.type === 'admin' && <button onClick={deleteArticle} className='btn btn-danger'>حذف</button> }
        </div>
      </div>
    </div>
  )
}

export default ArticleCard

