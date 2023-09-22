import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import './reserve.css'
import Title from '../../components/title/Title';
import { toast } from 'react-toastify';
import axios from 'axios';
import url from '../../constants/url';
import { ReservationsContext } from '../../context/reservationContext';

const ReserveForm = () => {
    const {courseworkname, id} = useParams()
    const { setReloadReservations } = useContext(ReservationsContext)
    const [info, setInfo] = useState({
        name: '',
        birthday: '',
        wilaya: '',
        phone: '',
        email: '',
    })
    const [inputType, setInputType] = useState('text');
    const [emptyName, setEmptyName] = useState(false)
    const [emptyBirthday, setEmptyBirthday] = useState(false)
    const [emptyWilaya, setEmptyWilaya] = useState(false)
    const [emptyPhone, setEmptyPhone] = useState(false)
    const [emptyEmail, setEmptyEmail] = useState(false)

    const handleChange = async (e) => {
        setInfo((prev)=> ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleFocus = () => {
        setInputType('date');
    };
    
    const handleBlur = () => {
        setInputType('text');
    };

    const reservation = async(e) => {
        e.preventDefault()
        if(info.name.length !== 0 && info.birthday.length !== 0 && info.wilaya.length !== 0 && info.phone.length !== 0 && info.email.length !== 0 ){
            try {
                const response = await axios.post(`${url}reservation/${id}`, info, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_LEFT
                })
                setReloadReservations(true)
                setInfo({
                    name: '',
                    birthday: '',
                    wilaya: '',
                    phone: '',
                    email: '',
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
            setEmptyName(info.name.length === 0)
            setEmptyBirthday(info.birthday.length === 0)
            setEmptyWilaya(info.wilaya.length === 0)
            setEmptyPhone(info.phone.length === 0)
            setEmptyEmail(info.email.length === 0)
        }
    };

  return (
    <div className="reserve container">
        <Title title={`الحجز في دورة ${courseworkname}`} />
        <div className="center gap-3">
            <form className="gray-bg" onSubmit={reservation}>
                <input type="text" value={info.name} name='name' placeholder='الاسم واللقب بالعربية' className={`mb-3 ${emptyName ? 'border-danger' : 'border-0'}`} onChange={handleChange} />
                <input type={inputType} name='birthday' placeholder='تاريخ الميلاد'
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={info.birthday}
                className={`mb-3 ${emptyBirthday ? 'border-danger' : 'border-0'}`} onChange={handleChange} />
                <input type="text" value={info.wilaya} name='wilaya' placeholder='ولاية الإقامة' className={`mb-3 ${emptyWilaya ? 'border-danger' : 'border-0'}`} onChange={handleChange} />
                <input type="text" value={info.phone} name='phone' placeholder='رقم الهاتف' className={`mb-3 ${emptyPhone ? 'border-danger' : 'border-0'}`} onChange={handleChange} />
                <input type="text" value={info.email} name='email' placeholder='البريد الإلكتروني' className={`mb-3 ${emptyEmail ? 'border-danger' : 'border-0'}`} onChange={handleChange} />
                <button className="main-btn m-auto">أحجز الآن</button>
            </form>
            <div className="remark">
                سيتم الإتصال بك لتأكيد حجزك عن قريب , تأكد من إدخال رقم هاتف صحيح
            </div>
        </div>
    </div>
  )
}

export default ReserveForm