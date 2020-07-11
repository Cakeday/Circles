import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp, login } from './duck'
import { useHistory } from 'react-router-dom'

import styles from './component.module.css'

const Welcome = (props) => {

    const [newUser, setNewUser] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()


    const handleSignUpSubmit = async (e) => {
        e.preventDefault()
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            passwordConf: passwordConf
        }
        await dispatch(signUp(newUser))
        history.push('/main')
    }
    
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: password,
        }
        await dispatch(login(user))
        history.push('/main')
    }


    const SignUpForm = (
        <form className={styles.form} onSubmit={handleSignUpSubmit}>
            <input value={firstName} placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
            <input value={lastName} placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input value={password} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <input value={passwordConf} placeholder="Confirm Password" type="password" onChange={e => setPasswordConf(e.target.value)} />
            <input type="submit" value="Submit!" />
        </form>
    )
    
    const LoginForm = (
        <form className={styles.form} onSubmit={handleLoginSubmit}>
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input value={password} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <input type="submit" value="Submit!" />
        </form>
    )



    return (
        <div className={styles.container}>
            <div className={styles.centered}>
                <h1>Welcome to Circles</h1>
                <div className={styles.toggle}>
                    <button onClick={() => setNewUser(true)}>Sign Up</button>
                    <button onClick={() => setNewUser(false)}>Login</button>
                </div>
                {newUser ? SignUpForm : LoginForm}
            </div>
        </div>
    )
}




export default Welcome