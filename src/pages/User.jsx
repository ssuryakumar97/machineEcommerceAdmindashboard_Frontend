import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Upload,
} from "@mui/icons-material";
import {Link, useParams} from "react-router-dom"
import { userRequest } from "../requestMethods";

const UserDiv = styled.div`
  flex: 4;
`;
const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserTitle = styled.h1``;
const UserAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const UserContainer = styled.div`
  display: flex;
`;
const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
`;
const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const UserShowBottom = styled.div``;
const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const UserShowUsername = styled.span`
  font-weight: 600;
`;
const UserShowUserTitle = styled.span`
  font-weight: 300;
`;

const UserShowBottomTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #c9c5c5;
`;
const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;
const UserShowInfoTitle = styled.span``;
const PermIdentityIcon = styled(PermIdentity)`
  font-size: 16px !important;
`;
const PhoneAndroidIcon = styled(PhoneAndroid)`
  font-size: 16px !important;
`;
const CalendarTodayIcon = styled(CalendarToday)`
  font-size: 16px !important;
`;
const MailOutlineIcon = styled(MailOutline)`
  font-size: 16px !important;
`;
const LocationSearchingIcon = styled(LocationSearching)`
  font-size: 16px !important;
`;

const UserUpdateTitle = styled.span`
    margin-left: 10px;
    font-weight: bolder;
`;
const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;
const UserUpdateLeft = styled.div``;
const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    label{
        margin-bottom: 10px;
        font-size: 14px;
    }
`;

const UserUpdateInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`;
const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const UserUpdateUpload = styled.div`
    display: flex;
    align-items: center;
`;
const UserUpdateImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;
const UserUpdateImgInput = styled.input`
    display: none;
`;

const UserUpdateIcon = styled(Upload)`
    cursor: pointer;
`

const UserUpdateButton = styled.button`
    border-radius: 5px;
    margin: 10px 0px;
    border: none;
    padding: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
`

const User = () => {
  const [userData, setUserData] = useState()
  const {userId} = useParams()
  const initialEditData = {
    username:"",
    firstName:"",
    lastName:"",
    email:"",
    contactNumber: ""
  }

  const [updateData, setUpdateData] = useState(initialEditData)

  useEffect(() => {
    const getData = async() => {
      const res= await userRequest.get(`/users/find/${userId}`)
      console.log(res.data)
      setUserData(res.data)
    }
    getData()
  },[])

  const handleChange = (e) => {
    const obj = {[e.target.name]: e.target.value}
    setUpdateData((val) => ({...val, ...obj}))
  }

  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const res = await userRequest.put(`/users/${userId}`, updateData)
    setUpdateData(initialEditData)
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <UserDiv>
      <UserTitleContainer>
        <UserTitle>Edit User</UserTitle>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowImg
              src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              alt="User Show Image"
            ></UserShowImg>
            <UserShowTopTitle>
              <UserShowUsername>{userData?.firstName}</UserShowUsername>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowBottomTitle>Account Details</UserShowBottomTitle>
            <UserShowInfo>
              <PermIdentityIcon />
              <UserShowInfoTitle>{userData?.username}</UserShowInfoTitle>
            </UserShowInfo>
           <UserShowInfo>
              <PermIdentityIcon />
              <UserShowInfoTitle>{userData?.firstName.charAt(0).toUpperCase() + userData?.firstName.slice(1)}{" "}{userData?.lastName.charAt(0).toUpperCase() + userData?.lastName.slice(1)}</UserShowInfoTitle>
            </UserShowInfo>

            <UserShowBottomTitle>Contact Details</UserShowBottomTitle>
            {userData?.contactNumber != null && <UserShowInfo>
              <PhoneAndroidIcon />
              <UserShowInfoTitle>{userData?.contactNumber}</UserShowInfoTitle>
            </UserShowInfo>}
            <UserShowInfo>
              <MailOutlineIcon />
              <UserShowInfoTitle>{userData?.email}</UserShowInfoTitle>
            </UserShowInfo>
           
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Edit</UserUpdateTitle>
          <UserUpdateForm>
            <UserUpdateLeft>
              <UserUpdateItem>
                <label>Username</label>
                <UserUpdateInput type="text" name="username" placeholder="annabeck99" onChange={handleChange} value={updateData.username}/>
              </UserUpdateItem>
              <UserUpdateItem>
                <label>First Name</label>
                <UserUpdateInput type="text" name="firstName" placeholder="Anna" onChange={handleChange} value={updateData.firstName}/>
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Last Name</label>
                <UserUpdateInput type="text" name="lastName" placeholder="Beck" onChange={handleChange} value={updateData.lastName}/>
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Email</label>
                <UserUpdateInput
                  type="text"
                  name="email"
                  placeholder="annabeck99@gmail.com"
                  onChange={handleChange} 
                  value={updateData.email}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Phone</label>
                <UserUpdateInput type="text" name="contactNumber" placeholder="+91 93461 94527" onChange={handleChange} value={updateData.contactNumber}/>
              </UserUpdateItem>
              
              <UserUpdateButton onClick={handleUpdate}>Update</UserUpdateButton>
            </UserUpdateLeft>
           
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </UserDiv>
  );
};

export default User;
