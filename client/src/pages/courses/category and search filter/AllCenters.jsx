import { useContext, useState } from 'react'
import './styles.css'
import Title from '../../../components/Title'
import Loading from '../../../components/loading/Loading'
import CenterCard from '../../../components/main cards/CenterCard'
import UserContext from '../../../context/userContext'

const AllCenters = ({setId}) => {
    const { centers, usersLoading, user, users } = useContext(UserContext)
    const [type, setType] = useState('centers')

  return (
    <div className="page container">
        {user && user.type !== 'admin' ? <Title title={'جميع المراكز'} /> : <Title title={'المستخدمين'} />}
        { user && user.type === 'admin' && <div className="btns center gap-2 mb-4">
            <button onClick={()=>setType('centers')} className={`${type !== 'centers' && 'outline' } main-btn`}>المراكز</button>
            <button onClick={()=>setType('users')} className={`${type !== 'users' && 'outline' } main-btn`}>الطلاب</button>
        </div>}
        <div className="center filter">
            {
                usersLoading ? <Loading /> : type === 'centers' ? centers && centers.length !== 0 ?
                centers.map(e => (
                    <CenterCard setId={setId} data={e} white={false}  />
                ))
                : <h1 className="center text-color fw-bold h-full notFound">لا تتوفر أي مراكز لحد الساعة</h1>
                : users.length !== 0 ?
                users.map(e => (
                    <CenterCard setId={setId} data={e} student white={false}  />
                ))
                : <h1 className="center text-color fw-bold h-full notFound">لا يتوفر أي طلاب لحد الساعة</h1>
            }
        </div>
    </div>
  )
}

export default AllCenters