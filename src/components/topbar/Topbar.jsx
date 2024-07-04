import React from "react";
import styled from "styled-components";
import { Notifications, Settings } from "@mui/icons-material";
import Badge from "@mui/material/Badge";

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
  gap: 10px;
`;
const TopLeft = styled.div``;

const StyledBadge = styled(Badge)`
  cursor: pointer;
`;
const SettingsDiv = styled.div`
  cursor: pointer;
`;

const StyledSettings = styled(Settings)`
  color: #555;
`;

const StyledNotifications = styled(Notifications)`
  color: #555;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const Topbar = () => {
  return (
    <Topbardiv>
      <TopbarWrapperdiv>
        <TopLeft>
          <Logo>Euler admin</Logo>
        </TopLeft>
        <TopRight>
          <StyledBadge badgeContent={5}>
            <StyledNotifications />
          </StyledBadge>
          <SettingsDiv>
            <StyledSettings />
          </SettingsDiv>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="user"
          />
        </TopRight>
      </TopbarWrapperdiv>
    </Topbardiv>
  );
};

export default Topbar;
