import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import constant from '../helper/constant'
import AppModal from './AppModal'

function Header() {
    const [showModal, setShowModal] = useState(false)
    const location = useLocation()
    return (
        <header className="app_header">
            <div className="col">
                <Link to="/" className={`${location.pathname == "/" && "active"}`}>Home</Link>
                <Link to="/trade" className={`${location.pathname == "/trade" && "active"}`}>Trade</Link>
            </div>
            <div className="col">
                {(localStorage.getItem('email') === constant.email && localStorage.getItem("pass") === constant.pass) ?
                    <React.Fragment>
                        <span>{constant.email}</span> <button onClick={() => { localStorage.removeItem('email'); localStorage.removeItem("pass") }} className='btn logout'>Log out</button>
                    </React.Fragment>
                    :
                    <button className='btn' onClick={() => setShowModal(!showModal)} >Login</button>
                }
            </div>
            {showModal && <AppModal closeModal={setShowModal} />}
        </header>


    )
}

export default Header