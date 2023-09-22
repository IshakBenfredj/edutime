import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CourseworkContext } from '../../../context/courseworkContext';
import UserContext from '../../../context/userContext';

const SearchResult = ({ searchText }) => {
    const { courseworks, loading } = useContext(CourseworkContext);
    const { centers, usersLoading } = useContext(UserContext);

    const [courseworkCount, setCourseworkCount] = useState(0);
    const [centerCount, setCenterCount] = useState(0);

    useEffect(() => {
        const count = async () => {
            if (!loading) {
                const filteredCourseworks = await courseworks.filter(e => e.name.toLocaleLowerCase().includes(searchText)  && e.activation);
                setCourseworkCount(filteredCourseworks.length);
            }
        
            if (!usersLoading) {
                const filteredCenters = await centers.filter(e => e.name.toLocaleLowerCase().includes(searchText));
                setCenterCount(filteredCenters.length);
            }
        }
        count()
    }, [searchText, courseworks, loading, centers, usersLoading]);

    return (
        <div className="SearchResult">
            <Link to={`/search/courseworks/${searchText}`} className="resultCount">عدد الدورات : <span>{courseworkCount}</span></Link>
            <Link to={`/search/centers/${searchText}`} className="resultCount">عدد المراكز : <span>{centerCount}</span></Link>
        </div>
    );
};

export default SearchResult;