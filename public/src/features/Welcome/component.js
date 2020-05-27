import React, { useState } from 'react'

const Welcome = (props) => {

    const [newUser, setNewUser] = useState(true)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')


    const SignUpForm = (
        <form>
            <input value={firstName} name="firstName" placeholder="First Name" onChange={e => setFirstName(e.target.value)}></input>
            <input value={lastName} name="lastName" placeholder="Last Name" onChange={e => setLastName(e.target.value)}></input>
            <input value={email} name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
            <input type="password" value={password} name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
            <input type="password" value={passwordConf} name="passwordConf" placeholder="Confirm Password" onChange={e => setPasswordConf(e.target.value)}></input>
        </form>
    )

    const LoginForm = (
        <form>
            <input value={email} name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
            <input type="password" value={password} name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
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