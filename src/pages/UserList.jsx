import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { userRows } from "../dummyData";
import {Link} from "react-router-dom"
import { userRequest } from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UserListDiv = styled.div`
  flex: 4;
`;

const UserListUser = styled.div`
  display: flex;
  align-items: center;
`;

const UserListEditDiv = styled.div`
  display: flex;
  align-items: center;
`;
const UserListEditButton = styled.button`
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #1bab1b;
  color: white;
  cursor: pointer;
`;

const DeleteOutlineIconStyled = styled(DeleteOutlineIcon)`
  color: red;
  cursor: pointer;
`;




const UserList = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    const getData = async() => {
      const res = await userRequest.get("/users")
      console.log(res.data)
      setData(res.data)
    }
    getData()
  },[])  

  console.log(data)

  const handleDelete = async(id) => {
  setData(data.filter(val => val._id !== id))
  const deleteUser = await userRequest.delete(`/users/${id}`)
  // console.log(deleteUser.data)
  toast.success("Data deleted successfully")
}




  const columns = [
    { field: "_id", headerName: "ID", width: 180 },
    {
      field: "firstName",
      headerName: "User",
      width: 180,
      renderCell: (params) => {
        return (
          <UserListUser>
            {params.row.firstName}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <UserListEditDiv>
            <Link to={"/users/"+params.row._id}>
              <UserListEditButton>Edit</UserListEditButton>
            </Link>
            <DeleteOutlineIconStyled onClick={()=>handleDelete(params.row._id)}/>
          </UserListEditDiv>
        );
      },
    },
  ];
  return (
    <UserListDiv>
      <ToastContainer autoClose={2000} />
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </UserListDiv>
  );
};

export default UserList;
