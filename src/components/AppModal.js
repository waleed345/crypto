import React, { useState } from 'react'
import constant from '../helper/constant'

function AppModal({ closeModal }) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const onLoginClick = (e) => {
        e.preventDefault();
        if (email !== constant.email || pass !== constant.pass) {
            alert("Invalid Email and Password")
        } else {
            localStorage.setItem('email', email)
            localStorage.setItem('pass', pass)
            closeModal(false)
        }
    }
    return (
        <div id="app_modal" onClick={() => { closeModal(false) }}>
            <div className="inner" onClick={e => e.stopPropagation()}>
                <h1>Login</h1>
                <form >
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' />
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='Password' />
                    <button onClick={(e) => onLoginClick(e)} className='btn'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default AppModal