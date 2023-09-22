import './landing.css'
import images from '../../../constants/images'
import SearchResult from './SearchResult'
import { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import url from '../../../constants/url'
import axios from 'axios'
import UserContext from '../../../context/userContext'
import { toast } from 'react-toastify'

const Landing = () => {
  const {user} = useContext(UserContext)
  const [searchText, setSearchText] = useState('')
  const [offers, setOffers] = useState({});
  const [landing, setLanding] = useState(true);
  const [image, setImage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}getOffers`);
      setOffers(response.data);
      setLanding(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpdate = async (e) => {
    e.preventDefault()
    console.log(image);
    if (image) {
      const formData = new FormData()
      formData.append('image', image)
      const response = await axios.put(`${url}updateLandingImage`, formData ,{
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        encType: 'multipart/form-data'
      });
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_LEFT
      })
      fetchData();
    }
  }
  return (
    <div className="landing center relative">
      <img src={!landing && offers.image.length ? `${url}uploads/${offers.image}` : images.landing } alt="" />
      <div className="info relative white container">
        <h1>توفير حجز الدورات التدريبية والتعليمية</h1>
        <p>لديك دورة ؟ لديك مركز ترغب في ترويجه ؟ ترغب في تطوير مهاراتك ؟ أنت في المكان المناسب</p>
        <form className='center relative'>
          <input type="text" onChange={e=>setSearchText(e.target.value)} placeholder='إبحث عن دورات ومراكز التدريب' />
          <div className='white button center'><FaSearch /></div>
          {searchText.length !== 0 && <SearchResult searchText={searchText.toLocaleLowerCase()} />}
          { user && user.type === 'admin' && <>
            <input type="file" className='mt-3' id="landingImage" onChange={e => setImage(e.target.files[0])} />
           <button onClick={handleFileUpdate} className="main-btn label-landing full">تغيير الصورة</button>
          </> }
        </form>
      </div>
    </div>
  )
}
export default Landing


