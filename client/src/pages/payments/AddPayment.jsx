import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title"
import axios from "axios";
import url from "../../constants/url.js";
import './styles.css'
import { CourseworkContext } from "../../context/courseworkContext";
import UserContext from "../../context/userContext";
import { toast } from "react-toastify";
import ccp from "../../constants/ccp";

const AddPayment = () => {
    const { user } = useContext(UserContext)
    const [offers, setOffers] = useState();
    const { courseworks } = useContext(CourseworkContext)
    const [courseworksWP, setCourseworksWP] = useState();
    const [money, setMoney] = useState('000');
    const [paymentData, setPaymentData] = useState({
      selectedOffer: "",
      selectedCourses: [],
      image: null,
    });

    const handleChange = (e) => {
      const { name, value, checked } = e.target;
    
      // For radio inputs (selected offer)
      if (name === "selectedOffer") {
        setPaymentData({
          ...paymentData,
          [name]: value,
        });
      }
    
      // For checkboxes (selected courses)
      if (name === "selectedCourses") {
        let updatedSelectedCourses = [...paymentData.selectedCourses];
    
        if (checked) {
          updatedSelectedCourses.push(value);
        } else {
          updatedSelectedCourses = updatedSelectedCourses.filter(
            (courseId) => courseId !== value
          );
        }
    
        setPaymentData({
          ...paymentData,
          selectedCourses: updatedSelectedCourses,
        });
      }
    
      // For file input (selected file)
      if (name === "image") {
        setPaymentData({
          ...paymentData,
          image: e.target.files[0],
        });
      }
    };
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${url}getOffers`);
          setOffers(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [offers]);

    useEffect(()=>{
        const getCourses = async () => {
            const array = await courseworks.filter( e => e.userId === user._id && !e.activation )
            setCourseworksWP(array)
        }
        if (user) {
          getCourses()
        }
    },[courseworks, user])

    useEffect(()=>{
      if (paymentData.selectedOffer.length && paymentData.selectedCourses.length) {
        const calc = offers[paymentData.selectedOffer] * paymentData.selectedCourses.length
        setMoney(calc)
      }
    },[offers, paymentData.selectedCourses.length, paymentData.selectedOffer])

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(paymentData);
      if (paymentData.selectedOffer.length && paymentData.image && paymentData.selectedCourses.length) {
        try {
          const formData = new FormData();
          formData.append("selectedOffer", paymentData.selectedOffer);
          paymentData.selectedCourses.forEach((courseId) => {
            formData.append("selectedCourses", courseId);
          });
          formData.append("image", paymentData.image);
      
          const response  = await axios.post(`${url}createPayment`, formData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            encType: 'multipart/form-data'
          });
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_LEFT
        })
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
    };

  return (
    <div className="page payment container">
        <Title title={'الدفع'} />
        <form onSubmit={handleSubmit}>
          <h3>معلومات الحساب البريدي</h3>
          <div className="ccp-infos">
            <div className="ccp-info center">
              <span className="title text-color">الإسم واللقب:</span>
              <span className="value">{ccp.name}</span>
            </div>
            <div className="ccp-info center">
              <span className="title text-color">رقم الحساب:</span>
              <span className="value">{ccp.num}</span>
            </div>
            <div className="ccp-info center">
              <span className="title text-color">المفتاح:</span>
              <span className="value">{ccp.key}</span>
            </div>
            <div className="ccp-info center">
              <span className="title text-color">العنوان:</span>
              <span className="value">{ccp.address}</span>
            </div>
            <div className="ccp-info center">
              <span className="title text-color">بريدي موب:</span>
              <span className="value">{ccp.baridi}</span>
            </div>
          </div>
          <h3>قم بإختيار نوع العرض الذي يلائمك</h3>
          <div className="offers">
            <div className="offer center">
              <label htmlFor="1">شهر بـ {offers && offers.month} دج للدورة</label>
              <input
                type="radio"
                value="month"
                name="selectedOffer"
                id="1"
                onChange={handleChange}
                checked={paymentData.selectedOffer === "month"}
              />
            </div>
            <div className="offer center">
              <label htmlFor="2">ستة أشهر بـ {offers && offers.sixMonths} دج للدورة</label>
              <input 
                type="radio"
                value="sixMonths"
                name="selectedOffer"
                id="2"
                onChange={handleChange}
                checked={paymentData.selectedOffer === "sixMonths"}
              />
            </div>
            <div className="offer center">
              <label htmlFor="3">سنة بـ {offers && offers.year} دج للدورة</label>
              <input 
                type="radio"
                value="year"
                name="selectedOffer"
                id="3"
                onChange={handleChange}
                checked={paymentData.selectedOffer === "year"}
              />
            </div>
          </div>
          <h3>قم بإختيار الدورات التي تريد تفعيلها</h3>
          <div className="checkbox-group">
            {courseworksWP &&
              courseworksWP.map((e) => (
                <div key={e._id} className="checkbox-div center">
                  <label htmlFor={e._id} >{e.name}</label>
                  <input
                    type="checkbox"
                    name="selectedCourses"
                    value={e._id}
                    id={e._id}
                    checked={paymentData.selectedCourses.includes(e._id)}
                    onChange={handleChange}
                  />
                </div>
              ))}
          </div>
          <div className="calcMoney center gray-bg box-shadow">
            <span>المبلغ كاملا</span>
            <p className="input">{money} دج</p>
          </div>
          <h3>قم بإرفاق صورة لوصل التسديد تحمل المبلغ كاملا</h3>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
          />
          <button className="main-btn w-full mt-4">دفع</button>
          <div className="remark my-3">
            <b>في حال تم قبول طلبكم أو رفضه فسيتم إعلامكم عن طريق البريد الإلكتروني مع توضيح أسباب الرفض في حال حدث ذلك</b>
          </div>
          <div className="remark">
            <b>بعض الأسباب التي قد يرفض طلبك نظرا إليها :</b>
            <ul className="mb-0">
              <li className="mt-2">عدم إرسال المبلغ كاملا</li>
              <li className="mt-2">نشر كورسات منافية للأخلاق والدين الإسلامي</li>
              <li className="mt-2">إرسال وصل تسديد مزور</li>
              <li className="mt-2 mb-0">صورة وصل التسديد غير واضحة</li>
            </ul>
          </div>
        </form>
    </div>
  )
}

export default AddPayment