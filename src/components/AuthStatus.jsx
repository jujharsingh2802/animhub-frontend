import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import LoginPagePopUp from './LoginPagePopUp';

function AuthStatus({children, authentication}) {

    const authstat = useSelector(state => state.auth.status);
    
    if(authentication && authstat !== authentication ){
        return <LoginPagePopUp/>
    }
    return(
        <>
            {children}
        </>
  )
}

export default AuthStatus