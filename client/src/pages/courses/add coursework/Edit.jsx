import './addCoursework.css'
import images from '../../../constants/images'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { CourseworkContext } from '../../../context/courseworkContext'
import axios from 'axios'
import url from '../../../constants/url'
import { useParams } from 'react-router-dom'

const Edit = () => {

    const { setReloadCourseworks } = useContext(CourseworkContext)
    const [inputType, setInputType] = useState('text');
    const {id} = useParams();
    const navigate = useNavigate()
    const [coursework, setCoursework] = useState({
        price : '',
        dateStart : '',
        hours : '',
        description : '',
  })

  const handleFocus = () => {
    setInputType('date');
  };

  const handleBlur = () => {
    setInputType('text');
  };

  const handleChange = ( e )=> {
    setCoursework(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const update = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.patch(`${url}updateCoursework/${id}`, coursework, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }            } );
      toast.success( data.message, {
        position: toast.POSITION.TOP_LEFT
      })
      navigate(`/courseworkDetails/${data.course.name}/${id}`)
      setReloadCourseworks(true)
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500)
      toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_LEFT
      })
    }
  };

  return (
    <div className="section coursework gray-bg">
      <div className="img center">
        <img src={images.coursework} alt="" />
        <h1 className='white relative' >تعديل الدورة التدريبية</h1>
      </div>
      <form className='box-shadow form' onSubmit={update}>
        <div className='center'>
          <input type="text" value={coursework.price} name='price' className='w-full' onChange={handleChange} placeholder='سعر الدورة' />
        </div>
        <div className='center'>
          <input type={inputType}
          value={coursework.dateStart}
          onFocus={handleFocus} onBlur={handleBlur}
          name='dateStart' onChange={handleChange} placeholder='تاريخ البدء ' />
          <input type="number" value={coursework.hours} name='hours' onChange={handleChange} placeholder='عدد ساعات التدريب الإجمالية' />
        </div>
        <textarea name='description' value={coursework.description} onChange={handleChange} placeholder='وصف تفصيلي لمحاور الدورة'></textarea>
        <div className="remark">
          في حال لم تقم بملئ أي خانة فسيتم الإحتفائظ بقيمتها السابقة
        </div>
        <button className="main-btn mx-auto">تعديل</button>
      </form>
    </div>
  )
}

export default Edit