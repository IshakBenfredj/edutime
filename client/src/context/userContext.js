import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import url from '../constants/url';
import { toast } from 'react-toastify';

const UserContext = createContext();

export default UserContext

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [centers, setCenters] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);
    const [reloadUsers, setReloadUsers] = useState(false);
    const [reloadUser, setReloadUser] = useState(false);

    useEffect(() => {
        const fetchAdminOnReload = async () => {
            try {
                const response = await axios.get(`${url}getUser/${localStorage.getItem('userId')}`);
                setUserLoading(false);
                setUser(response.data.user)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500 ){
                    if (error.response.data.error === "user doesn't exist") {
                        localStorage.removeItem('userId')
                        localStorage.removeItem('token')
                        setUserLoading(false);
                        setUser(null)
                        toast.error('هذا حساب غير موجود أو تم حذفه', {
                            position: toast.POSITION.TOP_LEFT
                        })
                    }
                }
                setUserLoading(false);
            }
        };
        if (localStorage.getItem('userId') || reloadUser){
            fetchAdminOnReload();
        } else {
            setUserLoading(false)
        }
    }, [reloadUser]);

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${url}getUsers`);
                setAllUsers(response.data.users)
                const usersArray = response.data.users.filter(e=> e.type === 'user')
                const centersArray = response.data.users.filter(e=> e.type === 'center')
                setUsers(usersArray)
                setCenters(centersArray)
                setUsersLoading(false);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500 ){
                    toast.error(error.response.data.error, {
                        position: toast.POSITION.TOP_LEFT
                    })
                }
                setUsersLoading(false);
            }
        };
        fetchUsers();
        if (reloadUsers) {
            fetchUsers();
            setReloadUsers(false)
        }
    },[reloadUsers])

    return (
        <UserContext.Provider value={{ allUsers,setReloadUser, user, setUser, users, centers, userLoading, usersLoading, setUserLoading,setReloadUsers }}>
            {children}
        </UserContext.Provider>
    )
}

