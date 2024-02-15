import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { useParams } from 'react-router-dom'
import { CourseworkContext } from '../../../context/courseworkContext'
import Title from '../../../components/title/Title'
import Loading from '../../../components/loading/Loading'
import CourseworkCard from '../../../components/CourseworkCard'

const CategoryCourses = () => {
    const { category } = useParams()
    const { courseworks, loading } = useContext(CourseworkContext)
    const [categoryCourses, setCategoryCourses] = useState([])
    useEffect(()=>{
        const getCategoryCourses = async () => {
            if (!loading && category !== 'allCourseworks') {
                const courses = await courseworks.filter(e => e.category === category && e.activation )
                setCategoryCourses(courses)
            } else {
                setCategoryCourses(courseworks.filter(e => e.activation))
            }
        }
        getCategoryCourses()
    },[courseworks, category, loading])

  return (
    <div className="page container">
        { category !== 'allCourseworks' ? <Title title={`دورات ${category}`} /> : <Title title={'جميع الدورات'} />}
        <div className="center filter">
            {
                loading ? <Loading /> : categoryCourses.length !== 0 ?
                categoryCourses.map(e => 
                    <CourseworkCard data={e} white={false}  />
                )
                : <h1 className="center text-color fw-bold h-full notFound">{category !== 'allCourseworks' ? 'لا تتوفر دورات في هذه الفئة' : 'لا يوجد أي دورات لحد الساعة'}</h1>
            }
        </div>
    </div>
  )
}

export default CategoryCourses