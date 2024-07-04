import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {login} from "../redux/apiCalls"
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { current } from '@reduxjs/toolkit'

const LoginDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LoginInputs = styled.input`
  padding: 10px;
  margin-bottom: 20px;
`

const ErrorDiv = styled.div`
  color: red;
`

const LoginButton = styled.button`
  padding: 10px;
  width: 100px;
  margin: 10px;
`

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorData, setErrorData] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const handleClick = async(e) => {
      e.preventDefault()
      try {
        const loginResponse = await login(dispatch, {username, password})
     console.log(loginResponse)
     if(loginResponse.data === "success") {
      setError(false)
      navigate("/")
      await new Promise((resolve) => setTimeout(resolve, 500))
      window.location.reload()
    } else if(loginResponse.data === "error") {
      setError(true)
      setErrorData(loginResponse.res)
    }
      } catch (error) {
        console.log(error)
      }
     
      
    }
  return (
    <LoginDiv>
      <LoginInputs type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
      <LoginInputs type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
        {error && <ErrorDiv>{errorData}</ErrorDiv>}
        <LoginButton onClick={handleClick}>Login</LoginButton>
    </LoginDiv>
  )
}

export default Login
