import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Visibility} from '@mui/icons-material';
import { userRequest } from '../../requestMethods';

const WidgetSmDiv = styled.div`
    flex:1;
    -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  padding: 20px;
  margin-right: 20px;
`
const WidgetSmTitle = styled.span`
    font-size: 22px;
    font-weight: 600;
`
const WidgetSmList = styled.ul`
    margin : 0 ;
    padding: 0;
    list-style: none;
`
const WidgetSmListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
`
const WidgetSmImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const WidgetSmUser = styled.div`
    display: flex;
    flex-direction: column;
`
const WidgetSmUsername = styled.span`
    font-weight: 600;
`
const WidgetSmUserTitle = styled.span`
    font-weight: 300;
`
const WidgetSmButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
`

const WidgetSmIcon = styled(Visibility)`
    font-size: 16px;
    margin-right: 5px;
`

const WidgetSm = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async() => {
            try {
                const res = await userRequest.get("users/?new=true")
                setUsers(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    },[])

  return (
    <WidgetSmDiv>
      <WidgetSmTitle>New Join Members</WidgetSmTitle>
      <WidgetSmList>
        {users.map((user) => (

            <WidgetSmListItem key={user._id}>
            <WidgetSmImg src={user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="User Image" />
            <WidgetSmUser>
                <WidgetSmUsername>{user.username}</WidgetSmUsername> 
            </WidgetSmUser>
            <WidgetSmButton><WidgetSmIcon/>Display</WidgetSmButton>
        </WidgetSmListItem>
        ))}
      </WidgetSmList>
    </WidgetSmDiv>
  )
}

export default WidgetSm
