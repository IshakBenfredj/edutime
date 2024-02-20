import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/Title";
import { toast } from "react-toastify";
import url from "../../constants/url";
import PaymentCard from "./PaymentCard";
import Loading from "../../components/loading/Loading";

const Payments = () => {
  const [month, setMonth] = useState("");
  const [sixMonths, setSixMonths] = useState("");
  const [year, setYear] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState(true);

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get(`${url}getPayments`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
    setLoading(false)
  };
  useEffect(() => {
    fetchPayments();
  }, []);

  const handleChange = (e) => {
    // Update state based on input name
    const { name, value } = e.target;
    switch (name) {
      case "month":
        setMonth(value);
        break;
      case "sixMonths":
        setSixMonths(value);
        break;
      case "year":
        setYear(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (month.length > 0 && sixMonths.length > 0 && year.length > 0) {
      try {
        const response = await axios.put(`${url}updateOffers`, {
          month,
          sixMonths,
          year,
        }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
        toast.success(response.data.message, {
            position: toast.POSITION.TOP_LEFT
        })
        setMonth('')
        setSixMonths('')
        setYear('')
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
    <div className="page container">
      <Title title={'تحديث العروض'} />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          className="mb-2 border-0"
          onChange={handleChange}
          name="month"
          placeholder="شهر"
          value={month}
        />
        <input
          type="number"
          className="mb-2 border-0"
          onChange={handleChange}
          name="sixMonths"
          placeholder="ستة أشهر"
          value={sixMonths}
        />
        <input
          type="number"
          className="mb-2 border-0"
          onChange={handleChange}
          name="year"
          placeholder="سنة"
          value={year}
        />
        <button type="submit" className="main-btn w-full m-auto">
          تحديث
        </button>
      </form>
      <div className="buttons change-cards center gap-3">
        <div onClick={()=>setAll(true)} className={`main-btn ${!all && 'outline'}`}>الطلبات</div>
        <div onClick={()=>setAll(false)} className={`main-btn ${all && 'outline'}`}>المرفوضة</div>
      </div>
      <div className="payments center gap-3 flex-column mt-4">
        {
          loading ? <Loading /> : !payments.length ? 
          <h1 className='fw-bold center text-color'>لايوجد طلبات</h1> : !all ? payments.map( e => 
            !e.etat && e.seeit && <PaymentCard fetchPayments={fetchPayments} key={e._id} item={e} />  ) : payments.map( e => 
            !e.seeit && <PaymentCard refuseBtn fetchPayments={fetchPayments} key={e._id} item={e} />  )
        }
      </div>
    </div>
  );
};

export default Payments;