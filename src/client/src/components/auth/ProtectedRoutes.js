import React, { Fragment, useContext } from 'react'
import { useHistory } from 'react-router'
import { CurrentUserContext } from '../../store/currentUser'

const PrivateRoutes = (props) => {

    const history = useHistory()
    const {state: currentUserState} = useContext(CurrentUserContext)

    return (
        <Fragment>
            { currentUserState.user ? props.children : history.push('/') }
        </Fragment>
    )
}

export default PrivateRoutes
