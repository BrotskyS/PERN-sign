import React, {useState} from 'react'
import {Link} from "react-router-dom"

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try{
            const body = {email, password, name}
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const parseRes = await response.json()

            localStorage.setItem("token", parseRes.token)
            setAuth(true)
        }catch (err){
            console.error(err.message)
        }

    }
    const {email, password, name} = inputs
    return (
        <>
            <h1>Register</h1>
            <form className={'text-center my-5'} onSubmit={onSubmitForm}>
                <input
                    type='email'
                    name='email'
                    placeholder='email'
                    className={'form-control my-3'}
                    onChange={e => onChange(e)}/>
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    className={'form-control my-3'}
                    onChange={e => onChange(e)}/>
                <input
                    type='text'
                    name='name'
                    placeholder='name'
                    className={'form-control my-3'}
                    onChange={e => onChange(e)}/>
                <button className={'btn btn-success btn-block'}>
                    Submit
                </button>
                <Link to={'/login'}>Login</Link>
            </form>
        </>
    )
}
export default Register