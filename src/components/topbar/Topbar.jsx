import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AccountCircle } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

const Topbardiv = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
`;

const TopbarWrapperdiv = styled.div`
  height: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 30px;
  color: purple;
  cursor: pointer;
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* gap: 10px; */
`;
const TopLeft = styled.div``;



const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
`;



const DropDownMenu = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
`;

const DropDownList = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  padding: 0;
  width: 150px;
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  opacity: 1;
  background-color: white;
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 35px;
    height: 10px;
    width: 10px;
    transform: rotate(45deg);
    border-top: solid 1px lightgray;
    border-left: solid 1px lightgray;
    background-color: white;
    cursor: pointer;
  }
`;

const StyledAccountCircleIcon = styled(AccountCircle)`
  font-size: 40px;
  cursor: pointer;
  &:hover {
    background-color: aliceblue;
    color: black;
  }
`;

const UnorderedList = styled.ul`
  padding: 0px;
  margin: 0px;
`;

const ListItem = styled.li`
  list-style-type: none;
  padding: 10px;
  text-align: center;
  color: black;
  border: solid 1px lightgrey;
  &:nth-child(1) {
    border-radius: 5px 5px 0 0;
  }
  &:nth-child(3) {
    border-radius: 0 0 5px 5px;
  }
  &:hover {
    background-color: #eae6e6;
    cursor: pointer;
  }
`;

const Topbar = () => {

  const [dropDown,setDropDown] = useState(false)

  const menuRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    let handler = (event) => {
      
      if (!menuRef.current?.contains(event.target)) {
        setDropDown(false);
      }
    };

    window.addEventListener("mousedown", handler);

    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleLoginLogout = () => {
    localStorage.removeItem("persist:root");
    navigate("/login");
    window.location.reload()
  }

  return (
    <Topbardiv>
      <TopbarWrapperdiv>
        <TopLeft>
          <Logo>Euler admin</Logo>
        </TopLeft>
        <TopRight>
          
          
          <DropDownMenu ref={menuRef}>
          <StyledAccountCircleIcon 
          style={{fontSize:"40px"}}
            onClick={() => setDropDown((prev) => !prev)}
          />
          {dropDown && (
            <DropDownList>
              <UnorderedList>
                <ListItem onClick={handleLoginLogout}>Login</ListItem>
                <ListItem onClick={handleLoginLogout}>Logout</ListItem>
              </UnorderedList>
            </DropDownList>
          )}
        </DropDownMenu>
        </TopRight>
      </TopbarWrapperdiv>
    </Topbardiv>
  );
};

export default Topbar;
