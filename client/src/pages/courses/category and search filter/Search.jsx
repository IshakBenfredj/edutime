import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Title from '../../../components/title/Title'
import UserContext from '../../../context/userContext'
import { CourseworkContext } from '../../../context/courseworkContext'
import Loading from '../../../components/loading/Loading'
import CenterCard from '../../../components/main cards/CenterCard'
import CourseworkCard from '../../../components/main cards/CourseworkCard'

import './styles.css'
import NotFound from '../../../components/not found/NotFound'

const Search = () => {
    const { searchText, type } = useParams()
    const { centers, usersLoading } = useContext(UserContext);
    const { courseworks, loading } = useContext(CourseworkContext);
    const [centersResult, setCentersResutlt] = useState([])
    const [courseworksResult, setCourseworksResutlt] = useState([])

    useEffect(()=>{
      const result = async () => {
        if (type === 'centers') {
          if (!usersLoading) {
            const filteredCenters = await centers.filter(e => e.name.toLocaleLowerCase().includes(searchText));
            setCentersResutlt(filteredCenters);
          }
        } else if (type === 'courseworks') {
          if (!loading) {
            const filteredCourseworks = await courseworks.filter(e => e.name.toLocaleLowerCase().includes(searchText)  && e.activation);
            setCourseworksResutlt(filteredCourseworks);
        }
        }
      }
      result()
    },[centers, courseworks, loading, searchText, type, usersLoading])

  return (
     <div className="page container">
      {(type !== 'centers' && type !== 'courseworks' ) ? <NotFound /> :
      <>
        <Title title={`نتائج البحث ${type === 'centers' ? 'لمراكز' : 'لدورات'} " ${searchText} "`} />
        <div className="filter center">
          {
            type === 'centers' && (usersLoading ? <Loading /> :
            centersResult.length !== 0 ?
            centersResult.map(e => <CenterCard data={e} /> ) 
            : <h1 className="center text-color fw-bold h-full notFound">لا يوجد نتائج بحث</h1>)
          }
          {
            type === 'courseworks' && (loading ? <Loading /> : 
            courseworksResult.length !== 0 ?
            courseworksResult.map(e => <CourseworkCard data={e} /> )
            : <h1 className="center text-color fw-bold h-full notFound">لا يوجد نتائج بحث</h1>)
          }
        </div>
      </>}
    </div>
  )
}

export default Search