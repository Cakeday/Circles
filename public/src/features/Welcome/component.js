import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp, login } from './duck'
import { Redirect } from 'react-router-dom'

const Welcome = (props) => {

    const [newUser, setNewUser] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.signUp.isLoggedIn)

    if (isLoggedIn) return (<Redirect to='/main' />)

    const handleSignUpSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            passwordConf: passwordConf
        }
        console.log(newUser)
        dispatch(signUp(newUser))
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: password,
        }
        dispatch(login(user))
    }


    const SignUpForm = (
        <form onSubmit={handleSignUpSubmit}>
            <input value={firstName} placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
            <input value={lastName} placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input value={password} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <input value={passwordConf} placeholder="Confirm Password" type="password" onChange={e => setPasswordConf(e.target.value)} />
            <input type="submit" value="Submit!" />
        </form>
    )
    
    const LoginForm = (
        <form onSubmit={handleLoginSubmit}>
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input value={password} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <input type="submit" value="Submit!" />
        </form>
    )



    return (
        <div>
            <h1>Welcome to Circles</h1>
            <button onClick={() => setNewUser(true)}>Sign Up</button>
            <button onClick={() => setNewUser(false)}>Login</button>
            {newUser ? SignUpForm : LoginForm}
        </div>
    )
}




export default Welcome