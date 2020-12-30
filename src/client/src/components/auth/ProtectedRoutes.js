import React, { Fragment, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { CurrentUserContext } from '../../store/currentUser'

const PrivateRoutes = (props) => {

    const history = useHistory()
    const {state: currentUserState, fetchUser} = useContext(CurrentUserContext)

    if (localStorage.getItem('token') && !currentUserState.user){
        console.log("FIRING")
        fetchUser()
    }

    console.log(currentUserState.user)

    useEffect(() => {

    },[currentUserState])

    return (
        <Fragment>
            // If localStorage token exists, check for user, if user exists, render children
            // otherwise render load. if no localStorage, push to login
            { localStorage.getItem('token') ? 
                currentUserState.user ? 
                 : history.push('/') }
        </Fragment>
    )
}

export default PrivateRoutes
