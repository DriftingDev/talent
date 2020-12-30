import React, { Fragment, useContext } from 'react'
import { useHistory } from 'react-router'
import { CurrentUserContext } from '../../store/currentUser'
import Loading from '../layout/Loading'

const PrivateRoutes = (props) => {

    const history = useHistory()
    const {state: currentUserState} = useContext(CurrentUserContext)

    return (
        <Fragment>
            { localStorage.getItem('token') ? 
                currentUserState.user ? 
                props.children : <Loading />
            :
             history.push('/')
             }
        </Fragment>
    )
}

export default PrivateRoutes
