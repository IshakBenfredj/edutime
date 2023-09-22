import React, { useContext, useState } from 'react'
import url from '../../constants/url';
import UserContext from '../../context/userContext';
import './styles.css'
import { toast } from 'react-toastify';
import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const Publish = ({setReload}) => {
  const { user } = useContext(UserContext);
  const [label, setLabel] = useState('رفع صورة')
  const [article,setArticle] = useState({
    title: '',
    description: '',
    image:''
  });

  const isValidImageType = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (file) {
      return allowedTypes.includes(file.type);
    }
    return false
  };
  
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file && isValidImageType(file)) {
        setArticle((prev) => ({
          ...prev,
          image: file
        }));
        setLabel('تم إضافة صورة');
    } else if (isValidImageType(file)) {
      setLabel('يجب تحميل صورة من نوع JPEG, JPG, PNG, أو WEBP فقط');
    } else {
      setLabel('رفع صورة')
    }
  };

  const handleChange = (e) => {
      setArticle({ ...article, [e.target.name]: e.target.value });
  };

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    
    ['link'],
    ['clean']                                         // remove formatting button
  ];
  
  const module = {
    toolbar : toolbarOptions
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('description', article.description);
    formData.append('image', article.image);
    console.log(article);
    if (article.description.length && article.description.length && article.image ){
      try {
        const response = await axios.post(`${url}addArticle/${user._id}`, formData, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_LEFT
        })
        // clear form state
        setArticle({
          title: '',
          description: '',
          image:''
        });
        setLabel('رفع صورة')
        setReload(true)
      } catch (error) {
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_LEFT
        })
      }
    } else {
      toast.error('يجب ملئ جميع الحقول', {
        position: toast.POSITION.TOP_LEFT
      })
    }
  }

  return (
    <form className='publish' onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" value={article.title} onChange={handleChange} className='w-full m-auto mb-3' name='title' placeholder='عنوان المقال' />
      {/* <textarea
        name="description" value={article.description} id="description" placeholder='المقال'
        className=' w-full'
        onChange={handleChange}
      ></textarea> */}
      <ReactQuill
        theme="snow"
        modules={module}
        defaultValue={article.description}
        onChange={(value) => setArticle({ ...article, description: value })}
      />
      <div className="center">
          <input type="file" name="image" accept=".png, .jpg, .jpeg, .webp" onChange={handleImage} id="imagePost" style={{display:'none'}} />
          <label htmlFor="imagePost" className='main-btn w-1/2'>{label}</label>
          <button className='main-btn w-1/2'>نشر</button>
      </div>
    </form>
  )
}


export default Publish
