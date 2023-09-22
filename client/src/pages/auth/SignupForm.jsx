import React, { useState } from 'react'
import {FaMapMarkedAlt, FaUserAlt} from 'react-icons/fa'
import {AiFillLock, AiFillPhone} from 'react-icons/ai'
import {MdPassword} from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-toastify'
import url from '../../constants/url'
import {HiMail} from 'react-icons/hi'
import {BsImageFill} from 'react-icons/bs'

const SignupForm = () => {

const [signupStep, setSignupStep] = useState('signup')
  const [signupDone, setSignupDone] = useState(false)
  const [label , setLabel] = useState('إضافة صور')
  const [signupInfo, setSignupInfo] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
    image: '',
    address: '',
    password: ''
  })
  const handleSignupInfo = (e) => {
    setSignupInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }))
}

  const isValidImageType = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    return allowedTypes.includes(file.type);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file && isValidImageType(file)) {
        setSignupInfo((prev) => ({
            ...prev,
            image: file
        }));
        setLabel('تم إضافة صورة الدورة');
    } else {
        setLabel('يجب تحميل صورة من نوع JPEG, JPG, PNG, أو WEBP فقط');
    }
  };
  const [responseCode, setResponseCode] = useState()
  const [inputCode, setInputCode] = useState()
  const [emptyName, setEmptyName] = useState(false)
  const [emptyEmail, setEmptyEmail] = useState(false)
  const [emptyPassword, setEmptyPassword] = useState(false)
  const [emptyType, setEmptyType] = useState(false)
  const [emptyPhone, setEmptyPhone] = useState(false)
  const [emptyAddress, setEmptyAddress] = useState(false)
  const [emptyImage, setEmptyImage] = useState(false)

  const confirmMail = async (e) => {
    e.preventDefault()
    if (signupInfo.name.length === 0 || signupInfo.email.length === 0 || signupInfo.password.length === 0 || signupInfo.phone.length === 0 || signupInfo.address.length === 0 || signupInfo.type.length === 0 || signupInfo.image.length === 0 ) {
      setEmptyName( signupInfo.name.length === 0 )
      setEmptyEmail( signupInfo.email.length === 0 )
      setEmptyPassword( signupInfo.password.length === 0 )
      setEmptyType( signupInfo.type.length === 0 )
      setEmptyPhone( signupInfo.phone.length === 0 )
      setEmptyAddress( signupInfo.address.length === 0 )
      setEmptyImage( signupInfo.image.length === 0 )
      toast.error('يجب ملئ جميع الحقول', {
        position: toast.POSITION.TOP_LEFT,
      })
    } else {
      try {
        const response = await axios.post(`${url}confirmEmail`, {email : signupInfo.email})
        setSignupStep('confirmEmail')
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        })
        setResponseCode(response.data.code)
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500)
          toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_LEFT,
          })
      }
    }
  }
  const Signup = async (e) => {
    e.preventDefault()
    console.log(signupInfo);
    if (inputCode !== responseCode) {
      toast.error('الرمز الذي أدخلته خاطئ', {
        position: toast.POSITION.TOP_LEFT,
    })
    } else {
      try {
        const formData = new FormData();
        formData.append('type', signupInfo.type);
        formData.append('name', signupInfo.name);
        formData.append('email', signupInfo.email);
        formData.append('phone', signupInfo.phone);
        formData.append('image', signupInfo.image);
        formData.append('address', signupInfo.address);
        formData.append('password', signupInfo.password);
        const response = await axios.post(`${url}signup`, formData)
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        })
        setSignupDone(true)
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500)
          toast.error(error.response.data.error, {
              position: toast.POSITION.TOP_LEFT,
          })
      }
    }
  }
  return (
    <div className="signup-form">
          { signupStep === 'signup' && <div>
            <div className="title">إنشاء حساب</div>
            <form onSubmit={confirmMail}>
              <div className="input-boxes">
                <div className="user-type center">
                  <div className='center'>
                    <input type="radio" checked={signupInfo.type === 'user'} onChange={handleSignupInfo} name="type" value={'user'} id="user" />
                    <label className={`${emptyType ? 'text-danger' : ''}`} htmlFor="user">طالب</label>
                  </div>
                  <div className='center'>
                    <input type="radio" checked={signupInfo.type === 'center'} onChange={handleSignupInfo} name="type" value={'center'} id="center" />
                    <label className={`${emptyType ? 'text-danger' : ''}`} htmlFor="center">مدرب/مركز</label>
                  </div>
                </div>
                <div className="input-box">
                  <FaUserAlt />
                  <input type="text" value={signupInfo.name} onChange={handleSignupInfo} name='name' className={`${emptyName ? 'border-danger' : 'border-0'}`} placeholder="الإسم الكامل" />
                </div>
                <div className="input-box">
                  <HiMail />
                  <input type="email" value={signupInfo.email} onChange={handleSignupInfo} name='email' className={`${emptyEmail ? 'border-danger' : 'border-0'}`} placeholder="البريد الإلكتروني" />
                </div>
                <div className="input-box">
                  <AiFillPhone />
                  <input type="text" value={signupInfo.phone} onChange={handleSignupInfo} name='phone' className={`${emptyPhone ? 'border-danger' : 'border-0'}`} placeholder="رقم الهاتف" />
                </div>
                <div className="input-box">
                  <FaMapMarkedAlt />
                  <input type="text" value={signupInfo.address} onChange={handleSignupInfo} name='address' className={`${emptyAddress ? 'border-danger' : 'border-0'}`} placeholder="العنوان بالتفصيل" />
                </div>
                <div className="input-box">
                  <BsImageFill />
                  <label htmlFor="image" className={`input center ${emptyImage ? 'border-danger' : 'border-0'}`}>{label}</label>
                  <input type="file" id='image' onChange={handleImage} name='image' className='d-none'/>
                </div>
                <div className="input-box">
                  <AiFillLock />
                  <input type="password" value={signupInfo.password} onChange={handleSignupInfo} name='password' className={`${emptyPassword ? 'border-danger' : 'border-0'}`} placeholder="كلمة السر" />
                </div>
                <div className="button input-box">
                  <input type="submit" value="إنشاء" />
                </div>
                <div className="text sign-up-text">لديك حساب بالفعل ؟ <label  htmlFor="flip">تسجيل الدخول</label></div>
              </div>
            </form>
          </div>}
          { (signupStep === 'confirmEmail' && !signupDone) && <div>
            <div className="title">أكد بريدك الإلكتروني</div>
            <form onSubmit={Signup}>
              <p className='text-color mt-3'>قمنا بإرسال رمز الى بريدك الإلكتروني</p>
              <div className="input-boxes">
                <div className="input-box">
                  <MdPassword />
                  <input type="text" value={inputCode} onChange={e=> setInputCode(e.target.value)} placeholder="الرمز" />
                </div>
                <div className="button input-box center">
                  <input type="submit" value="تأكيد" className='w-auto px-3 mx-3' />
                  <div className="main-btn" onClick={e=>setSignupStep('signup')}>رجوع</div>
                </div>
                <div className="text sign-up-text">لديك حساب بالفعل ؟ <label  htmlFor="flip">تسجيل الدخول</label></div>
              </div>
            </form>
          </div>}
          { signupDone && <div>
            <div className="title">تم إنشاء الحساب</div>
                <div className="text sign-up-text"> <label className='fs-4'  htmlFor="flip">تسجيل الدخول</label></div>
          </div>}
        </div>
  )
}

export default SignupForm

