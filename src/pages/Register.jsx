import styled from "styled-components"
import { useState } from "react"
import { publicRequest } from "../requestMethods"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

const Container = styled.div`
    width:100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.ctfassets.net/grb5fvwhwnyo/2HL5SCznbunekaWh3NA4Se/933f074e93d4784b0fbfe2cf35c2dee1/card-pros-cons-technology-manufacturing-eto-mto-mro.jpg") no-repeat center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
const  Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;

`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Input = styled.input`
  flex:1;
  min-width:40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const ErrorDiv = styled.div`
  color: red;
`

const LinkItem = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  color: black;
  text-decoration: underline;
  cursor: pointer;
`
 
function Register() {

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [userData, setUserData] = useState(initialValues)
  const [error, setError] = useState(false)
  const [errorData, setErrorData] = useState("")
 

  const navigate = useNavigate()
  const handleOnchange = (e) => {
    const object = {[e.target.name]: e.target.value}
    setUserData((val) => ({...val,...object }))
  }

  const handleClick = async(e) => {
    e.preventDefault()
    if(userData.password === userData.confirmPassword){
      setError(false)
      try {
        const handleRegister = await publicRequest.post("/auth/register", userData)
      console.log(handleRegister.data)
      // toast.success("Data registered successfully")
      setErrorData("")
      setUserData(initialValues)
      navigate('/login')
      } catch (error) {
        console.log(error.response.data.message)
        setError(true)
        setErrorData(error.response.data.message)
      }
      
    } else {
      setError(true)
      setErrorData("Password doesn't match")
    }
  }
  console.log(userData)
  return (
    <Container>
      {/* <ToastContainer autoClose={2000}/> */}
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
            <Input placeholder="first name" name="firstName" onChange={handleOnchange} value={userData.firstName}/>
            <Input placeholder="last name" name="lastName" onChange={handleOnchange} value={userData.lastName}/>
            <Input placeholder="username" name="username" onChange={handleOnchange} value={userData.username}/>
            <Input placeholder="email" name="email" onChange={handleOnchange} value={userData.email}/>
            <Input type="password" placeholder="password" name="password" onChange={handleOnchange} value={userData.password}/>
            <Input type="password" placeholder="confirm password" name="confirmPassword" onChange={handleOnchange} value={userData.confirmPassword}/>
            {error && <ErrorDiv>{errorData}</ErrorDiv>}
            <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
            <Button onClick={handleClick}>REGISTER</Button>
            
        </Form>
        <LinkItem to="/login">ALREADY HAVE AN ACCOUNT</LinkItem>
      </Wrapper>
    </Container>
  )
}

export default Register
