import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import './navbare.css'
import UserContext from '../../context/userContext'
import { ModeContext } from '../../context/modeContext';

import { IoMdCloseCircleOutline } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsFillArrowUpCircleFill, BsSunFill } from 'react-icons/bs'
import { BiSolidMoon } from 'react-icons/bi'
import images from '../../constants/images';
import axios from 'axios';
import url from '../../constants/url';
import {FaUserGraduate} from 'react-icons/fa'
import {AiFillPlusCircle} from 'react-icons/ai'

const Navbare = () => {

    const { user, setUser } = useContext(UserContext)
    const [ openNav, setOpenNav ] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const location = useLocation();
    const [bg, setBg] = useState(false);
    const [auth, setAuth] = useState(true);
    const navigate = useNavigate()
    const {mode , setReloadMode}= useContext(ModeContext)

    useEffect(() => {
        if (location.pathname === '/auth') {
            setAuth(true);
        } else {
            setAuth(false);
        }
        if (location.pathname === '/') {
            setBg(false);
        } else {
            setBg(true);
        }
    }, [location.pathname, setBg]);

    useEffect(() => {
        const handleScroll = () => {
            let position = window.pageYOffset;
            setScrollPosition(position);
        };
        window.addEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogOut = ()=>{
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        setUser(null)
        navigate('/')
        toast.success('تم تسجيل الخروج بنجاح', {
            position: toast.POSITION.TOP_CENTER
        })
    }

    const handleModeSun = ()=>{
        localStorage.setItem('mode','light')
        setReloadMode(true)
    }
    const handleModeNight = ()=>{
        localStorage.setItem('mode','night')
        setReloadMode(true)
    }

    const resetNotify = async () => {
        localStorage.setItem('notifyCount',user.notifyCount)
        const {data} = await axios.patch(`${url}resetNotify/${user._id}`)
        user.notifyCount = 0
        setUser(data.user)
    }

    function removeNotifyCountFromLocalStorage() {
        localStorage.removeItem('notifyCount');
    }

    useEffect(() => {
        window.addEventListener('beforeunload', removeNotifyCountFromLocalStorage);
    
        return () => {
            window.removeEventListener('beforeunload', removeNotifyCountFromLocalStorage);
        };
    }, []);

return (
    <div className={`header ${(scrollPosition > 200 || bg) && 'bg'}`}>
            {
                mode === 'night' ? <div className="mode" onClick={handleModeSun}> <BsSunFill /> </div> : <div className="mode" onClick={handleModeNight}> <BiSolidMoon /> </div>
            }
        <div className="container mx-auto">
            <NavLink to="/" className="logo">
                <img src={ (scrollPosition > 200 || bg) ? images.mainLogo : images.whiteLogo } alt=''/>
            </NavLink>
            <div className={`main-nav ${ openNav && 'open' }`}>
                <div className="close" onClick={()=>setOpenNav(false)}> <IoMdCloseCircleOutline /> </div>
                <ul className="nav">
                    <li onClick={()=>{setOpenNav(false); scrollToTop()}}><NavLink to="/">الرئيسية</NavLink></li>
                    {
                        ( !auth && !user) && <>
                            <li onClick={()=>setOpenNav(false)}><a href="/#categories">الفئات</a></li>
                        </>
                    }
                    <li onClick={()=>setOpenNav(false)}><NavLink to={`/${!user ? 'centers' : user.type !== 'admin' ? 'centers' : 'users'}`}>{!user ? 'المراكز' : user.type !== 'admin' ? 'المدربين/المراكز' : 'المستخدمين'}</NavLink></li>
                    <li onClick={()=>setOpenNav(false)}><NavLink to="/courseworks/allCourseworks">الدورات</NavLink></li>
                    <li onClick={()=>setOpenNav(false)}><NavLink to="/articles">المدونة</NavLink></li>
                </ul>
            </div>
            {!user && <NavLink className="main-btn" to="/auth">تسجيل الدخول</NavLink>}
            { user && 
            <div className='user-work center'>
                {user.type === 'center' && <>
                <Link to="/orders" onClick={resetNotify} className='main-btn outline center gap-2'>
                    <FaUserGraduate/>
                    <span className='btns-nav-text'>طلبات الحجز</span>
                    {user.notifyCount !== 0 && <span className='notification'>{user.notifyCount}</span>}
                </Link>
                <Link to={'/addCoursework'} className='main-btn outline center gap-2'>
                    <AiFillPlusCircle />
                    <span className='btns-nav-text'>إضافة إعلان</span>
                    </Link>
                </>}
                <div className="dropdown show profile">
                    <Link className={`dropdown-toggle center ${user && user.type !== 'center' && 'admin'}`} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FaUserCircle />
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <NavLink className="dropdown-item" to={`/profile`}>الملف الشخصي</NavLink>
                        {
                            user && user.type === 'admin' &&
                        <>
                        <NavLink to="/payments">طلبات التفعيل</NavLink>
                        <NavLink to={`/${user && user.type !== 'admin' ? 'centers' : 'users'}`}>{user && user.type !== 'admin' ? 'المدربين/المراكز' : 'المستخدمين'}</NavLink>
                        <NavLink to="/courseworks/allCourseworks">الدورات</NavLink>
                        <NavLink to="/articles">المدونة</NavLink>
                        </>
                        }
                        <div className="dropdown-divider"></div>
                        <NavLink className="dropdown-item btn btn-danger" onClick={handleLogOut} to="/">تسجيل الخروج</NavLink>                    </div>
                </div>
            </div>
            }
            <div className={`open-icon ${(scrollPosition > 200 || bg) && 'bg'}`} onClick={()=>setOpenNav(true)}><GiHamburgerMenu /></div>
        </div>
        <span onClick={scrollToTop} className={`scrollTop ${scrollPosition > 500 && 'dis'}`}><BsFillArrowUpCircleFill /></span>
    </div>
)
}

export default Navbare