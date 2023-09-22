import React, { useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slides.css'
import CenterCard from '../main cards/CenterCard';

const Slides = ({array, Element, bg}) => {
    const [swiperRef, setSwiperRef] = useState(null);

    const slideTo = (index) => {
        swiperRef.slideTo(index - 1, 0);
    };

  return (
    <>
   <Swiper
        modules={[Virtual, Navigation, Pagination]}
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
            type: 'fraction',
        }}
        navigation={true}
        virtual
        className='center'
    >
        {array.map((e, index) => (
        <SwiperSlide className={`${bg} box-shadow`} key={e._id} virtualIndex={index}>
            <Element data={e} />
        </SwiperSlide>
        ))}
    </Swiper>

    <p className="append-buttons mt-2 center w-full">
        {array.length > 1 && <button onClick={() => slideTo(1)} className="prepend-slide main-btn">
            {Element === CenterCard ? 'المركز' : 'التدريب'} {1}
        </button>}
        {array.length > 3 && <button onClick={() => slideTo(Math.ceil(array.length / 2))} className="slide-250 main-btn">
            {Element === CenterCard ? 'المركز' : 'التدريب'} {Math.ceil(array.length / 2)}
        </button>}
       {array.length > 1 && <button onClick={() => slideTo(array.length)} className="slide-500 main-btn">
            {Element === CenterCard ? 'المركز' : 'التدريب'} {array.length}
        </button>}
    </p>
    </>
  )
}

export default Slides