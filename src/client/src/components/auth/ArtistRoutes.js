import React, { Fragment, useContext } from 'react'
import { useHistory } from 'react-router'
import { CurrentUserContext } from '../../store/currentUser'

const ArtistRoutes = (props) => {

    const history = useHistory()
    const {state: currentUserState} = useContext(CurrentUserContext)

    return (
        <Fragment>
            { currentUserState.user.is_artist ? props.children : () => {
              console.log("YOU SHALL NOT PASS")
              history.push('/')
            } }
        </Fragment>
    )
}

export default ArtistRoutes
