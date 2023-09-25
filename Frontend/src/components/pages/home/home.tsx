import React from 'react'

import HomeLogin from './partials/homeLogin'
import HomeAlquiler from './partials/homeAlquiler'

const Home = () => {
    const user = window.localStorage.getItem( 'user' )
    return (
        <>
            {
                user
                    ? (
                        <>
                            <HomeAlquiler/>
                        </>
                    )
                    : (
                        <>
                            <HomeLogin/>
                        </>
                    )
            }
        </>
    )
}

export default Home
