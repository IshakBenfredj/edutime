import React, { useContext, useState, useEffect } from 'react';
import './sugg.css'
import Loading from '../../../components/loading/Loading';
import Title from '../../../components/title/Title';
import CenterCard from '../../../components/main cards/CenterCard';
import UserContext from '../../../context/userContext';
import { Link } from 'react-router-dom';

const CentersSugg = ({setId}) => {
  const { user, centers, usersLoading } = useContext(UserContext);
  const [selectedCenters, setSelectedCenters] = useState([]);
  function getRandomElementsFromArray(arr, numElements) {
    if (numElements >= arr.length) {
      return arr;
    }
    const randomElements = [];
    for (let index = 0; index < arr.length; index++) {
        const i = Math.floor(Math.random() * arr.length )
        if(!randomElements.includes(arr[i])){
            randomElements.push(arr[i])
        }
        if(randomElements.length === 3){
            break;
        }
        if(index === arr.length -1 && randomElements.length !== 3  ){
            index = 0
        }
    }
    return randomElements;
}

  useEffect(()=>{
    if (!usersLoading) {
      const random = getRandomElementsFromArray(centers, 3)
      setSelectedCenters(random)
    }
  }, [centers, usersLoading])

  return (
    <section className='gray-bg'>
      <Title title={'مدربين/مراكز مقترحة'} />
      <div className="center random">
        {usersLoading ? (
          <Loading />
        ) : selectedCenters.length !== 0 ? (
          selectedCenters.map((center) => (
            <CenterCard setId={setId} white={true} key={center._id} data={center} />
          ))
        ) : (
          <h1 className='center fw-bold text-color'>لايوجد أي مراكز</h1>
        )}
      </div>
      <Link to={`/${user && user.type !== 'admin' ? 'centers' : 'users'}`} className="main-btn ft m-auto mt-3">كل المراكز</Link>
    </section>
  );
};

export default CentersSugg;