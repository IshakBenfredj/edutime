import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import url from "../../constants/url"
import UserContext from "../../context/userContext"
import { toast } from "react-toastify"
import axios from "axios"

const PaymentCard = ({item,fetchPayments,refuseBtn}) => {
  const { centers, usersLoading } = useContext(UserContext)
  const [center, setCenter] = useState({})
  const [image, setImage] = useState('')
  const [causePopup, setCausePopup] = useState(false)
  const [cause, setCause] = useState('')

  useEffect(() => {
    async function getCenter(){
      if (!usersLoading) {
        const centerFind = await centers.find(e => e._id === item.userId)
        setCenter(centerFind)
      }
    }
    getCenter()
  },[centers, item.userId, usersLoading])

  const accept = async () => {
    try {
      const response  = await axios.put(`${url}accept`, item, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_LEFT
      })
      fetchPayments()
    } catch (error) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_LEFT
      })
    }
  }
  const refuse = async (e) => {
    e.preventDefault()
    if (cause.length) {
      try {
        const response  = await axios.put(`${url}refuse`, {item, cause}, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_LEFT
        })
        fetchPayments()
        setCausePopup(false)
      } catch (error) {
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_LEFT
        })
      }
    } else {
      toast.error('يرجى تحديد سبب الرفض', {
        position: toast.POSITION.TOP_LEFT
      })
    }
  }

  return (
    <>
    {
      image && 
      <div className="full-image">
        <div onClick={ () => setImage('')} className="close">x</div>
        <img src={`${url}uploads/${image}`} alt="" />
      </div>
    }
    {
      causePopup && 
      <div className="cause-popup">
        <form>
          <h2>يرجى تحديد سبب رفض طلب مركز {center.name}</h2>
          <textarea type="text" onChange={e=>setCause(e.target.value)} className="my-3"></textarea>
          <div className="center gap-3">
            <button className="btn btn-success" onClick={refuse}>تأكيد الرفض</button>
            <button className="btn btn-danger" onClick={()=>setCausePopup(false)}>إلغاء</button>
          </div>
        </form>
      </div>
    }
    <div className="payment-card gray-bg box-shadow center">
      <img src={`${url}uploads/${item.image}`}
        onClick={ () => setImage(item.image)}
        alt={item.image} />
      <div className="payment-infos">
        <div className="payment-info mb-2 text-color">
          من طرف : <Link to={`/centerDetails/${center.name}/${center._id}`}><span>{ !usersLoading && center.name }</span></Link>
        </div>
        <div className="payment-info mb-2 text-color">
          عدد الدورات : <span>{ item.courses.length }</span>
        </div>
        <div className="payment-info mb-2 text-color">
          المبلغ : <span>{ item.amount } دج</span>
        </div>
        <div className="payment-info mb-2 text-color">
          الإشتراك : <span>{ item.paymentType === 'month' ? 'شهر' : item.paymentType === 'sixMonths' ? 'ستة أشهر' : 'سنة'  }</span>
        </div>
        <div className="buttons center gap-4">
          <button className="btn btn-success" onClick={accept}>قبول</button>
          { refuseBtn && <button className="btn btn-danger" onClick={()=>setCausePopup(true)}>رفض</button>}
        </div>
      </div>
    </div>
    </>
  )
}

export default PaymentCard

