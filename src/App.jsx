import { useState } from "react";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import styled from "styled-components";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from './pages/Login';
import { useSelector } from "react-redux";
import Sales from "./pages/Sales";
import Orders from "./pages/Orders";
import Order from "./pages/Order";

const MainDiv = styled.div`
  display: flex;
  margin-top: 10px;
`;

const PrivateRoute = ({isAdmin}) => {
  console.log(isAdmin)
  return isAdmin ? (
    <>
      <Topbar />
        <MainDiv>
          <Sidebar/>
          <Outlet/>
        </MainDiv>
      
    </>
  ) : (<Navigate to="/login"/>)
}
function App() {
  // const admin =  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser?.isAdmin
// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser?.isAdmin)
const admin = useSelector(state =>  state.user?.currentUser?.isAdmin)
console.log(admin) 
return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<PrivateRoute isAdmin={admin}/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="/users/:userId" element={<User/>}/>
          <Route path="/newUser" element={<NewUser/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="/newProduct" element={<NewProduct/>}/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/order/:id" element={<Order/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
