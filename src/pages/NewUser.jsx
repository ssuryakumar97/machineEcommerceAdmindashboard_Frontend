import React from 'react'
import styled from 'styled-components'

const NewUserDiv = styled.div`
    flex: 4;
`
const NewUserTitle = styled.h1``
const NewUserForm = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const NewUserItem = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
    label{
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        color: gray;
    }
`
const NewUserInput = styled.input`
    height:30px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
`
const NewUserGender = styled.div`
    input{
        margin-top: 15px;
    };
    label{
        margin: 10px;
        font-size: 18px;
        color: #555;
    }
`
const NewUserSelect = styled.select`
    height: 40px;
    border-radius: 5px;
`

const NewUserButton = styled.button`
    width: 200px;
    border: none;
    background-color: darkblue;
    color: white;
    padding: 7px 10px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
`
 
const NewUser = () => {
  return (
    <NewUserDiv>
      <NewUserTitle>New User</NewUserTitle>
        <NewUserForm>
            <NewUserItem>
                <label>Username</label>
                <NewUserInput type='text' placeholder='John' />
            </NewUserItem>
            <NewUserItem>
                <label>Full Name</label>
                <NewUserInput type='text' placeholder='John Smith' />
            </NewUserItem>
            <NewUserItem>
                <label>Email</label>
                <NewUserInput type='text' placeholder='john@gmail.com' />
            </NewUserItem>
            <NewUserItem>
                <label>Password</label>
                <NewUserInput type='password' placeholder='password' />
            </NewUserItem>
            <NewUserItem>
                <label>Phone</label>
                <NewUserInput type='text' placeholder='+91 92482 94571' />
            </NewUserItem>
            <NewUserItem>
                <label>Address</label>
                <NewUserInput type='text' placeholder='Chennai | Tamil Nadu' />
            </NewUserItem>
            <NewUserItem>
                <label>Gender</label>
                <NewUserGender>
                <input type='radio' name='gender' id="male" value="male" />
                <label htmlFor="male">Male</label>
                <input type='radio' name='gender' id="female" value="female" />
                <label htmlFor="female">Female</label>
                <input type='radio' name='gender' id="other" value="other" />
                <label htmlFor="male">Other</label>
                </NewUserGender>
            </NewUserItem>
            <NewUserItem>
                <label>Active</label>
                <NewUserSelect name='active' id='active'>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </NewUserSelect>
            </NewUserItem>
            <NewUserButton>Create</NewUserButton>
        </NewUserForm>
    </NewUserDiv>
  )
}

export default NewUser
