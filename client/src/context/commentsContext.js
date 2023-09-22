
import { createContext, useContext, useEffect, useState } from 'react';
import url from '../constants/url';
import axios from 'axios';
import UserContext from './userContext';

export const CommentsContext = createContext();

const CommentsContextProvider = ({ children }) => {

    const [loadingComments, setLoadingComments] = useState(true)
    const [comments, setComments] = useState([])
    const [reloadComments, setReloadComments] = useState(true)
    const { user } = useContext(UserContext)

    useEffect(()=>{
        const handleGetComments = async ()=>{
            const response = await axios.get(`${url}getComments`);
            setComments(response.data.comments)
            setLoadingComments(false)
        }
        handleGetComments()
        if (reloadComments) {
            handleGetComments()
            setReloadComments(false)
        }
    },[reloadComments, user])

  return (
    <CommentsContext.Provider value={{ comments, setComments, setReloadComments, loadingComments }}>
        {children}
    </CommentsContext.Provider>
  )
}

export default CommentsContextProvider

