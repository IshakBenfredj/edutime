import React, { useContext, useState, useEffect } from 'react';
import { CourseworkContext } from '../../../context/courseworkContext';
import Loading from '../../../components/loading/Loading';
import Title from '../../../components/title/Title';
import CourseworkCard from '../../../components/main cards/CourseworkCard';
import { Link } from 'react-router-dom';

const CourseworksSugg = () => {
  const { courseworks, loading } = useContext(CourseworkContext);
  const [selectedCourseworks, setSelectedCourseworks] = useState([]);

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
    async function filterArr(){
      const arr = await courseworks.filter(e => e.activation )
      const random = getRandomElementsFromArray(arr, 3)
      setSelectedCourseworks(random)
    }
    filterArr()
  },[loading])

  return (
    <section>
      <Title title={'دورات مقترحة'} />
      <div className="random center">
        {loading ? (
          <Loading />
        ) : selectedCourseworks.length !== 0 ? (
          selectedCourseworks.map((coursework) => (
            <CourseworkCard key={coursework._id} white={false} data={coursework} />
          ))
        ) : (
          <h1 className='center fw-bold text-color'>لايوجد أي دورات</h1>
        )}
      </div>
      <Link to={'/courseworks/allCourseworks'} className="main-btn ft m-auto mt-3">كل الدورات</Link>
    </section>
  );
};

export default CourseworksSugg;