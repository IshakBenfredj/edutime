import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './context/userContext.js';
import Loading from './components/loading/Loading.jsx';
import AddCoursework from './pages/courses/add coursework/AddCoursework.jsx';
import Edit from './pages/courses/add coursework/Edit.jsx';
import ReserveForm from './pages/reserve/ReserveForm.jsx';
import Reservations from './pages/reserve/Reservations.jsx';
import AddPayment from './pages/payments/AddPayment.jsx';
import Payments from './pages/payments/Payments.jsx';
import { useSelector } from 'react-redux';

const PrivateRoute = ({Element}) => {
    const user = useSelector((state) => state.user);
    
    if (!user) return <Navigate to='/auth' /> ;
    
    if (user.type !== 'center'  && (Element === AddCoursework || Element === Edit || Element === Reservations || Element === AddPayment )) return <Navigate to='/' /> ;

    if (user.type !== 'user' && Element === ReserveForm ) return <Navigate to='/' /> ;

    if (user.type !== 'admin' && Element === Payments ) return <Navigate to='/' /> ;

    return <Element /> ;
}

export default PrivateRoute