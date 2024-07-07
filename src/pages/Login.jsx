import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {login} from "../redux/apiCalls"
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { current } from '@reduxjs/toolkit'

const LoginDiv = styled.div`
  width:100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/manufacturing/ey-automated-production-facility-with-robots.jpg") no-repeat center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
const  Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
 flex:1;
  min-width:40%;
  margin: 10px 0px;
  padding: 10px;
`

const LoginInputs = styled.input`
  padding: 10px;
  margin-bottom: 20px;
`

const ErrorDiv = styled.div`
  color: red;
`

const LoginButton = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: purple;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed;
  }
`

const LinkItem = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  color: black;
  text-decoration: underline;
  cursor: pointer;
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
      <Wrapper>
      <Title>SIGN IN</Title>
      <Form>

      <LoginInputs type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
      <LoginInputs type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
        {error && <ErrorDiv>{errorData}</ErrorDiv>}
        <LoginButton onClick={handleClick}>Login</LoginButton>
      </Form>
      <LinkItem to="/register">CREATE NEW ACCOUNT</LinkItem>
      </Wrapper>
    </LoginDiv>
  )
}

export default Login
