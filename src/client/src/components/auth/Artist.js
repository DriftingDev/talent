import React, { Fragment, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { CurrentUserContext } from '../../store/currentUser'

const Artist = (Route) => {

    const history = useHistory()
    const {state: currentUserState} = useContext(CurrentUserContext)

    //console.log("in artist routes", currentUserState.user.is_artist)

    const auth = (props) => {
        return (
            currentUserState.user.is_artist ?
            <Route {...props} /> :
            history.push('/companies')
        )
    }
    
    return auth;
}

export default Artist
