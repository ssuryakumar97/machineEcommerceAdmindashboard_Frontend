import React from "react";
import styled from "styled-components";
import { Timeline, LineStyle, TrendingUp, PersonOutline, Inventory, AssessmentOutlined, CurrencyRupeeOutlined, Mail, Feedback, ChatBubble, Work, Report, ShoppingCart } from "@mui/icons-material";
import {Link, NavLink} from "react-router-dom"
import "../../App.css"

const SidebarDiv = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: #fcf8fc;
  position: sticky;
  top: 50px;
`;
const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;
const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;
const SidebarTitle = styled.h3`
  font-size: 13px;
  color: lightgray;
`;
const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
  font-size: 11px;
`;
const SidebarListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: #d5cbd5;
  }
  &.active {
    background-color: #dad2da;
  }
`;

const Sidebar = () => {
  return (
    <SidebarDiv>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>

          <SidebarList>
            <NavLink to='/' className="link">
              {({isActive}) => ( 
            <SidebarListItem className={isActive ? "active" : ""}>
              <LineStyle style={{ marginRight: "5px", fontSize: "20px" }} />
              Home
            </SidebarListItem>
              )}
            </NavLink>
            <NavLink to="/sales" className="link">
            {
              ({isActive}) => (
                <SidebarListItem className={isActive ? "active" : ""}>
              <TrendingUp style={{ marginRight: "5px", fontSize: "20px" }} />
              Sales
            </SidebarListItem>
              )
              }
              
            </NavLink>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Quick Menu</SidebarTitle>

          <SidebarList>
            <NavLink to="/users" className="link">
            {({isActive}) => (<SidebarListItem className={isActive?"active":""}>
              <PersonOutline style={{ marginRight: "5px", fontSize: "20px" }} />
              Users
            </SidebarListItem>)}
            </NavLink>
            <NavLink to="/products" className="link">{({isActive})=>(
                <SidebarListItem className={isActive?"active":""} >
                <Inventory style={{ marginRight: "5px", fontSize: "20px" }} />
                Products
              </SidebarListItem>
            )}
            </NavLink>
            <NavLink to="/orders" className="link">{({isActive})=>(
                <SidebarListItem className={isActive?"active":""} >
                <ShoppingCart style={{ marginRight: "5px", fontSize: "20px" }} />
                Orders
              </SidebarListItem>
            )}
            </NavLink>
            <SidebarListItem>
              <CurrencyRupeeOutlined style={{ marginRight: "5px", fontSize: "20px" }} />
              Transactions
            </SidebarListItem>
            <SidebarListItem>
              <AssessmentOutlined style={{ marginRight: "5px", fontSize: "20px" }} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Notifications</SidebarTitle>

          <SidebarList>
            <SidebarListItem>
              <Mail style={{ marginRight: "5px", fontSize: "20px" }} />
              Mail
            </SidebarListItem>
            <SidebarListItem >
              <Feedback style={{ marginRight: "5px", fontSize: "20px" }} />
              Feedback
            </SidebarListItem>
            <SidebarListItem>
              <ChatBubble style={{ marginRight: "5px", fontSize: "20px" }} />
              Messages
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Staff</SidebarTitle>

          <SidebarList>
            <SidebarListItem>
              <Work style={{ marginRight: "5px", fontSize: "20px" }} />
              Manage
            </SidebarListItem>
            <SidebarListItem>
              <Timeline style={{ marginRight: "5px", fontSize: "20px" }} />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <Report style={{ marginRight: "5px", fontSize: "20px" }} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarDiv>
  );
};

export default Sidebar;
