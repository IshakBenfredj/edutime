/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useState } from 'react'
import './profile.css'
import UserContext from '../../context/userContext'
import url from '../../constants/url'
import Loading from '../../components/loading/Loading'
import { MdModeEditOutline } from 'react-icons/md'
import { AiFillCamera } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CourseworkContext } from '../../context/courseworkContext'
import CourseworkCard from '../../components/CourseworkCard'
import Title from '../../components/title/Title'
import { ReservationsContext } from '../../context/reservationContext'
import ReservationCard from '../../components/main cards/ReservationCard'

const Profile = () => {
    const { user, setUser, setReloadUsers,userLoading,setReloadUser } = useContext(UserContext)
    const { courseworks, loading } = useContext(CourseworkContext)
    const { reservations, loadingReservation, setReloadReservations } = useContext(ReservationsContext)
    const [userM , setUserM] = useState({
        name : '',
        email : '',
        phone : '',
        address : '',
        password : '',
    })
    const [image , setImage] = useState('')
    const [canNameModify , setCanName] = useState(false)
    const [canEmailModify , setCanEmail] = useState(false)
    const [canPhoneModify , setCanPhone] = useState(false)
    const [canAddressModify , setCanAddress] = useState(false)
    const [canPasswordModify , setCanPassword] = useState(false)
    const [myCourses , setMyCourses] = useState([])
    const [myReservations , setMyReservations] = useState([])

    const isValidImageType = (file) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        return allowedTypes.includes(file.type);
      };
    
      const handleImage = async (e) => {
        const file = e.target.files[0];
        if (file && isValidImageType(file)) {
            setImage(file);
            console.log(image);
        } else {
            alert('يجب تحميل صورة من نوع JPEG, JPG, PNG, أو WEBP فقط');
        }
      };

    const handleUpdateImage = async () => {
        try {
            const formData = new FormData()
            formData.append('image', image)
            const response = await axios.patch(`${url}updatePhotoProfile/${user._id}`, formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_LEFT
            })
            setImage('')
            setReloadUser(true)
        } catch (error) {
            toast.error(error.response.data.error, {
                position: toast.POSITION.TOP_LEFT
            })
        }
    };

    useEffect(()=>{
        if (!userLoading && user) {
            setUserM({
                name : user.name,
                email : user.email,
                phone : user.phone,
                address : user.address,
                password : '',
                image : '',
            })
        }
    },[user,userLoading])

    useEffect(()=>{
        const getCourse = async () => {
            if (!loading && !userLoading) {
                if (user.type === 'center') {
                    const filterCourses = await courseworks.filter( e => e.userId === user._id )
                    setMyCourses(filterCourses)
                }
            }
        }
        getCourse()
    },[courseworks, loading, user, userLoading])

    useEffect(()=>{
        const getReservations = async () => {
            if (!loadingReservation && !userLoading) {
                if (user.type === 'user') {
                    const filterReservations = await reservations.filter( e => e.reservator === user._id )
                    setMyReservations(filterReservations)
                }
            }
        }
        getReservations()
    },[loadingReservation, reservations, user, userLoading, setReloadReservations])

    const handleChange = async(e)=>{
        setUserM( prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleUpdate = async(info, type,setData)=>{
        if (type === 'password' || localStorage.getItem(type) !== info) {
            try {
                const { data } = await axios.patch(`${url}updateUser/${user._id}`,{info, type}, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
                setUser(data)
                setData(false)
                setReloadUsers(true)
                toast.success('تم التحديث بنجاح', {
                    position: toast.POSITION.TOP_LEFT
                })
                if (type === 'password') {
                    setUserM({...userM, password: ''})
                }
            } catch (error) {
                toast.error(error.response.data.error, {
                    position: toast.POSITION.TOP_LEFT
                })
            }
        }
        setData(false)
    }
  return (
    <div className="page container">
        {
        !user ? <Loading /> :
        <div className="center profile">
            <div className="profile-info">
                <div className="user-info center">
                    <input name='name' onChange={handleChange} type="text" className={canNameModify ? 'border-success' : 'border-0'} disabled={!canNameModify} value={userM.name} />
                    {
                        canNameModify ? <button className="main-btn" onClick={()=> handleUpdate(userM.name, 'name',setCanName)}>تحديث</button>
                        : <MdModeEditOutline className='gray-bg center' onClick={()=> {setCanName(true);;localStorage.setItem('name', userM.name)}} />
                    }
                </div>
                <div className="user-info center">
                    <input name='email' onChange={handleChange} type="email" className={canEmailModify ? 'border-success' : 'border-0'} disabled={!canEmailModify} value={userM.email} />
                    {
                        canEmailModify ? <button className="main-btn" onClick={()=> handleUpdate(userM.email, 'email',setCanEmail)}>تحديث</button>
                        : <MdModeEditOutline className='gray-bg center' onClick={()=> {setCanEmail(true);localStorage.setItem('email', userM.email)}} />
                    }
                </div>
                <div className="user-info center">
                    <input name='phone' onChange={handleChange} type="text" className={canPhoneModify ? 'border-success' : 'border-0'} disabled={!canPhoneModify} value={userM.phone} />
                    {
                        canPhoneModify ? <button className="main-btn" onClick={()=> handleUpdate(userM.phone, 'phone',setCanPhone)}>تحديث</button>
                        : <MdModeEditOutline className='gray-bg center' onClick={()=> {setCanPhone(true);localStorage.setItem('phone', userM.phone)}} />
                    }
                </div>
                <div className="user-info center">
                    <input name='address' onChange={handleChange} type="text" className={canAddressModify ? 'border-success' : 'border-0'} disabled={!canAddressModify} value={userM.address} />
                    {
                        canAddressModify ? <button className="main-btn" onClick={()=> handleUpdate(userM.address, 'address',setCanAddress)}>تحديث</button>
                        : <MdModeEditOutline className='gray-bg center' onClick={()=> {setCanAddress(true);localStorage.setItem('address', userM.address)}} />
                    }
                </div>
                <div className="user-info center">
                    <input name='password' onChange={handleChange} value={userM.password} type="text" className={canPasswordModify ? 'border-success' : 'border-0'} disabled={!canPasswordModify} placeholder={'كلمة السر'} />
                    {
                        canPasswordModify ? <button className="main-btn" onClick={()=> handleUpdate(userM.password, 'password',setCanPassword)}>تحديث</button>
                        : <MdModeEditOutline className='gray-bg center' onClick={()=> {setCanPassword(true)}} />
                    }
                </div>
            </div>
            <div className="profile-image relative">
                <img src={`${url}uploads/${user.image}`} alt="" />
                {
                    image ? <><div className="camera confirm center" onClick={handleUpdateImage}>تحديث الصورة إلى {image.name}</div>
                    <div className="camera center cancel" onClick={() => setImage('')}>إلغاء</div></>
                    : <label htmlFor='photoProfile' className="camera center"><AiFillCamera /></label>
                }
                <input onChange={handleImage} type="file" name="" id="photoProfile" className="d-none" />
            </div>
        </div>
        }
        {
        userLoading ? <Loading /> : user && user.type === 'center' ? loading ? <Loading/> :
        <section>
            <Title title={'دوراتك'} />
            <div className="center filter">
                { myCourses.length ?
                    myCourses.map(e => <CourseworkCard key={e._id} data={e} />) 
                    : <h1 className="center text-color fw-bold h-full notFound">لم تنشر أي دورات بعد</h1>
                }
            </div>
        </section>
        : user.type === 'user' ? loadingReservation ? <Loading /> : <section>
            <Title title={'حجوزاتك'} />
            <div className="center filter">
                { myReservations.length ?
                    myReservations.map(e => <ReservationCard key={e._id} data={e} />) 
                    : <h1 className="center text-color fw-bold h-full notFound">ليس هناك أي حجوزات</h1>
                }
            </div>
        </section> : null
        }
    </div>
  )
}

export default Profile

