import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/sign-in');
        }
    }, []);
  return <>{children}</>
}

export default ProtectedRoutes
