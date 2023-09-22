import React, { useState, useEffect } from 'react';
import './offers.css'
import axios from 'axios';
import url from '../../constants/url';
import Loading from '../loading/Loading';

const Offers = () => {
  const [offers, setOffers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}getOffers`);
        setOffers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='offers container'>
      {loading ? (
        <Loading />
      ) : (
        <ul className='center'>
          <li>
            <h2>1 شهر</h2>
            <div className="price">{offers.month} دج</div>
          </li>
          <li>
            <h2>6 أشهر</h2>
            <div className="price">{offers.sixMonths} دج</div>
            <div className="ben">سوف توفر { (offers.month * 6 - offers.sixMonths) * 2 } </div>
          </li>
          <li>
            <h2>1 سنة</h2>
            <div className="price">{offers.year} دج</div>
            <div className="ben">سوف توفر {offers.month * 12 - offers.year} </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Offers;
