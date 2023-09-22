import { Link } from 'react-router-dom'
import './popup.css'

const Popup = ({setClose, text}) => {
  return (
    <div className='full-popup center'>
        <div className="popup">
            <h4>نعتذر ! يجب عليك تسجيل الدخول إلى حسابك أو إنشاء حساب والدخول إليه من أجل إمكانية {text}</h4>
            <div className="btns-popup center align-items-stretch gap-3">
                <Link className='main-btn ft' to={'/auth'}>تسجيل الدخول</Link>
                <div onClick={()=>setClose(false)} className="button btn btn-danger">إلغاء</div>
            </div>
        </div>
    </div>
  )
}

export default Popup