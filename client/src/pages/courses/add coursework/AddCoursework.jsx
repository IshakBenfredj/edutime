import './addCoursework.css'
import images from '../../../constants/images'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CourseworkContext } from '../../../context/courseworkContext'
import axios from 'axios'
import url from '../../../constants/url'

const AddCoursework = () => {

  const [inputType, setInputType] = useState('text');
  const [labelCoursework , setLabelCoursework] = useState('إضافة صورة')
  const { setReloadCourseworks } = useContext(CourseworkContext)
  const [coursework, setCoursework] = useState({
    name : '',
    category : '',
    price : '',
    dateStart : '',
    hours : '',
    image : '',
    description : '',
  })

  const handleFocus = () => {
    setInputType('date');
  };

  const handleBlur = () => {
    setInputType('text');
  };

  useEffect(() => {
    coursework.image.length !== 0 ? setLabelCoursework(`تم إضافة صورة الدورة`) : setLabelCoursework('إضافة صورة للدورة');
  }, [coursework.image]);

  const handleChange = ( e )=> {
    setCoursework(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const isValidImageType = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    return allowedTypes.includes(file.type);
  };

const handleImage = (e) => {
  const file = e.target.files[0];
  if (file && isValidImageType(file)) {
      setCoursework((prev) => ({
        ...prev,
        image: file
      }));
      setLabelCoursework('تم إضافة صورة الدورة');
  } else {
      setLabelCoursework('يجب تحميل صورة من نوع JPEG, JPG, PNG, أو WEBP فقط');
  }
};

  const addCoursework = async(e) => {
    e.preventDefault()
    if(coursework.name.length !== 0 && coursework.category.length !== 0 && coursework.category !== 'الفئة' && coursework.price.length !== 0 && coursework.dateStart.length !== 0 && coursework.hours.length !== 0 && coursework.image.length !== 0 && coursework.description.length !== 0  ){
      console.log(coursework);
      try {
          const formData = new FormData();
          formData.append('name', coursework.name);
          formData.append('category', coursework.category);
          formData.append('price', coursework.price);
          formData.append('dateStart', coursework.dateStart);
          formData.append('hours', coursework.hours);
          formData.append('image', coursework.image);
          formData.append('description', coursework.description);
    
            const response = await axios.post(`${url}addCoursework`, formData, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
              encType: 'multipart/form-data'
            } );
            setReloadCourseworks(true)
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_LEFT
            }) 
            setCoursework({
              name : '',
              category : '',
              price : '',
              dateStart : '',
              hours : '',
              image : '',
              description : '',
            })
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500)
            toast.error(error.response.data.error, {
              position: toast.POSITION.TOP_LEFT
            })
        }
    } else {
      toast.error('يجب ملئ جميع الحقول', {
        position: toast.POSITION.TOP_LEFT
      })
    }
};

  return (
    <div className="section coursework gray-bg">
      <div className="img center">
        <img src={images.coursework} alt="" />
        <h1 className='white relative' >إضافة إعلان</h1>
      </div>
      <form  className='box-shadow form' onSubmit={addCoursework} encType="multipart/form-data">
        <div className='center'>
          <input type="text" name='name' value={coursework.name} onChange={handleChange} placeholder='إسم الدورة' />
          <input type="text" value={coursework.price} name='price' onChange={handleChange} placeholder='سعر الدورة' />
        </div>
        <div className='center'>
          <select name="category" onChange={handleChange}>
            <option disabled selected>الفئة</option>
            <option value={'التصميم'}>التصميم</option>
            <option value={'البرمجة'}>البرمجة</option>
            <option value={'التسويق'}>التسويق</option>
            <option value={'التكنولوجيا والبرمجيات'}>التكنولوجيا والبرمجيات</option>
            <option value={'التطوير الذاتي'}>التطوير الذاتي</option>
            <option value={'الأعمال'}>الأعمال</option>
            <option value={'التصوير'}>التصوير</option>
            <option value={'صوتيات'}>صوتيات</option>
            <option value={'فيديو وأنيميشن'}>فيديو وأنيميشن</option>
            <option value={'فئات أخرى'}>فئة أخرى</option>
          </select>
          <label className='center' htmlFor="image">{labelCoursework}</label>
          <input type="file" onChange={handleImage} name="image" id="image" className='d-none' />
        </div>
        <div className='center'>
          <input type={inputType}
          onFocus={handleFocus} onBlur={handleBlur}
          name='dateStart' value={coursework.dateStart} onChange={handleChange} placeholder='تاريخ البدء ' />
          <input type="number" value={coursework.hours} name='hours' onChange={handleChange} placeholder='عدد ساعات التدريب الإجمالية' />
        </div>
        <textarea name='description' value={coursework.description} onChange={handleChange} placeholder='وصف تفصيلي لمحاور الدورة'></textarea>
        <button className="main-btn mx-auto">إضافة تدريب</button>
      </form>
    </div>
  )
}

export default AddCoursework