import axios from 'axios'
import {HiMail} from 'react-icons/hi'
import {AiFillLock} from 'react-icons/ai'
import {MdPassword} from 'react-icons/md'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import url from '../../constants/url'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../toolkit/slices/user'
import Axios from '../../api'
import { useCookies } from 'react-cookie'

const LoginForm = () => {
  const [emptyLoginEmail, setEmptyLoginEmail] = useState(false)
  const [emptyLoginPassword, setEmptyLoginPassword] = useState(false)
  const [emptyCode, setEmptyCode] = useState(false)
  const [responseCode, setResponseCode] = useState()
  const [inputCode, setInputCode] = useState()
  const [userReset, setUserReset] = useState('')
  const [loginStep, setLoginStep] = useState('login')
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
      if ( location.pathname === '/auth' && user ) {
          navigate('/')
      }
  }, [location.pathname, navigate, user]);

  const handleChangeUser = ( e ) => {
    setLoginUser(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
  }

  const emailVerify = async (e) => {
    e.preventDefault()
    if (loginUser.email.length === 0) {
      setEmptyLoginEmail(true)
      toast.error('يجب ملئ الحقل', {
        position: toast.POSITION.TOP_LEFT,
      })
    } else {
      try {
        const response = await Axios.post(`/auth/emailVerify`, { email : loginUser.email });
        setLoginStep('confirmEmail')
        setResponseCode(response.data.code)
        setUserReset(response.data.user)
        setEmptyLoginEmail(false)
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500 ) 
        toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_LEFT
        })
      }
    }
  };
  const confirmEmail = async (e) => {
    e.preventDefault()
    if (responseCode !== inputCode) {
      setEmptyCode(true)
      toast.error('أدخل الكود بشكل صحيح', {
        position: toast.POSITION.TOP_LEFT,
      })
    } else {
      setLoginStep('changePassword')
      setEmptyCode(false)
    }
  };
  const resetPassword = async (e) => {
    e.preventDefault()
    if (loginUser.password.length === 0) {
      setEmptyLoginPassword(true)
      toast.error('يجب ملئ الحقل', {
        position: toast.POSITION.TOP_LEFT,
      })
    } else {
      try {
        const response = await Axios.post(`/auth/resetPassword`, { password: loginUser.password, id: userReset._id });
        toast.success(response.data.message, {
            position: toast.POSITION.TOP_LEFT
        })
        setEmptyLoginPassword(false)
        setLoginStep('done')
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500 ) 
        if (error.response && error.response.status >= 400 && error.response.status <= 500 ) 
        toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_LEFT
        })
    }
    }
};
  const userLogin = async (e) => {
    e.preventDefault()
    if (loginUser.email.length === 0 || loginUser.password.length === 0) {
      setEmptyLoginEmail( loginUser.email.length === 0 )
      setEmptyLoginPassword( loginUser.password.length === 0 )
      toast.error('يجب ملئ جميع الحقول', {
        position: toast.POSITION.TOP_LEFT,
      })
    } else {
      try {
        const { data } = await Axios.post('/auth/login', { email : loginUser.email, password: loginUser.password });
        dispatch(login(data.user))
        localStorage.setItem('token',data.token)
        navigate('/')
        setEmptyLoginEmail(false)
        setEmptyLoginPassword(false)
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500 ) 
        toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_LEFT
        })
      }
    }
  };
  return (
    <div className="login-form">
        {
          loginStep === 'login' &&
          <div>
            <div className="title">تسجيل الدخول</div>
            <form onSubmit={userLogin}>
              <div className="input-boxes">
                <div className="input-box">
                  <HiMail />
                  <input type="email" onChange={handleChangeUser} name='email' className={`${emptyLoginEmail ? 'border-danger' : 'border-0'}`} placeholder="البريد الإلكتروني" />
                </div>
                <div className="input-box">
                  <AiFillLock />
                  <input type="password" onChange={handleChangeUser} name='password' className={`${emptyLoginPassword ? 'border-danger' : 'border-0'}`} placeholder="كلمة السر" />
                </div>
                <div className="text"><Link onClick={()=> setLoginStep('emailVerify')}>نسيت كلمة السر ؟</Link></div>
                <div className="button input-box">
                  <input type="submit" value="دخول" />
                </div>
                <div className="text sign-up-text">ليس لديك حساب ؟ <label  htmlFor="flip">إنشاء حساب</label></div>
              </div>
            </form>
          </div>
        }
        { loginStep === 'emailVerify' && 
        <div>
          <div className="title">أدخل بريدك الإلكتروني</div>
          <form onSubmit={emailVerify}>
            <div className="input-boxes">
              <div className="input-box">
                <HiMail />
                <input type="email" name='email' value={loginUser.email} className={`${emptyLoginEmail ? 'border-danger' : 'border-0'}`} onChange={handleChangeUser} placeholder="البريد الإلكتروني" />
              </div>
              <div className="button input-box center">
                <input type="submit" value="إرسال الرمز" className='w-auto px-3 mx-3' />
                <div className="main-btn" onClick={()=>{setLoginStep('login');setEmptyLoginEmail(false)}}>رجوع</div>
              </div>
            </div>
          </form>
        </div>
        }
        { loginStep === 'confirmEmail' &&
          <div>
            <div className="title">أكد بريدك الإلكتروني</div>
            <p className="text-color mt-2">سيد(ة) {userReset.name}</p>
            <form onSubmit={confirmEmail}>
              <p className='text-color mt-3'>قمنا بإرسال رمز الى بريدك الإلكتروني</p>
              <div className="input-boxes">
                <div className="input-box">
                  <MdPassword />
                  <input type="text" value={inputCode} className={`${emptyCode ? 'border-danger' : 'border-0'}`} onChange={e=> setInputCode(e.target.value)} placeholder="الرمز" />
                </div>
                <div className="button input-box center">
                  <input type="submit" value="تأكيد" className='w-auto px-3 mx-3' />
                  <div className="main-btn" onClick={e=>setLoginStep('emailVerify')}>رجوع</div>
                </div>
              </div>
            </form>
          </div>
        }
        { loginStep === 'changePassword' &&
          <div>
          <div className="title">تغيير كلمة السر</div>
          <form onSubmit={resetPassword}>
            <div className="input-boxes">
              <div className="input-box">
                <MdPassword />
                <input type="text" name='password' className={`${emptyLoginPassword ? 'border-danger' : 'border-0'}`} value={loginUser.password} onChange={handleChangeUser} placeholder="كلمة السر الجديدة" />
              </div>
              <div className="button input-box center">
                <input type="submit" value="تغيير" />
              </div>
            </div>
          </form>
          </div>
        }
        { loginStep === 'done' &&
          <div>
            <div className="title">تم تغيير كلمة السر بنجاح</div>
                <div className="text sign-up-text"> <Link onClick={()=> setLoginStep('login')}>تسجيل الدخول</Link></div>
          </div>
        }
        </div>
  )
}

export default LoginForm