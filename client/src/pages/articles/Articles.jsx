import React, { useContext, useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import Title from '../../components/title/Title'
import Publish from './Publish'
import UserContext from '../../context/userContext';
import axios from 'axios';
import url from '../../constants/url';
import ArticleCard from './ArticleCard';
import Loading from '../../components/loading/Loading';

const Articles = () => {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}getArticles`);
        setArticles(response.data.articles);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error);
      }
    };
    fetchData();
    if (reload) {
      fetchData();
      setReload(false)
    }
  },[reload]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    767: 1,
  };
  return (
    <div className="page container">
      <Title title={'المدونة'} minTitle={'إكتشف آخر الاخبار والمقالات'} />
      {loading ? <Loading /> : user && user.type === 'admin' && <Publish setReload={setReload} /> }
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      {articles && articles.length ? articles.map( article => <ArticleCard setReload={setReload} key={article._id} article={article} />)
      : <h1 className='fw-bold center text-color'>لايوجد مقالات حاليا</h1>
      }
      </Masonry>
    </div>
  )
}
export default Articles