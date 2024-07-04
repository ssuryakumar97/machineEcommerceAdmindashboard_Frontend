import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {Link} from "react-router-dom"
import { userRequest } from '../requestMethods';
import { ToastContainer, toast } from 'react-toastify';

const OrderListDiv = styled.div`
    flex: 4;
`

const ProductListEditDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListEditButton = styled.button`
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

const Orders = () => {

    const [data, setData] = useState([])
    
    useEffect(() => {
        const getOrders = async() => {
          const res = await userRequest.get("/orders")
          console.log(res.data)
          setData(res.data)
        }
        getOrders()
      },[])

    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        {
          field: "userId",
          headerName: "Customer",
          width: 180,
        },
        {
          field: "amount",
          headerName: "Price",
          width: 120,
        },{
          field: "address",
          headerName: "Address",
          width: 120,
        },
        {
          field: "deliveryStatus",
          headerName: "Delivery Status",
          width: 120,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <ProductListEditDiv>
                <Link to={"/order/"+params.row._id}>
                  <ProductListEditButton>Edit</ProductListEditButton>
                </Link>
                <DeleteOutlineIconStyled onClick={()=>handleDelete(params.row)}/>
              </ProductListEditDiv>
            );
          },
        },
      ];

  return (
    <OrderListDiv>
      {/* This is order page */}
      <DataGrid
            rows={data}
            getRowId={(val)=>val._id}
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
    </OrderListDiv>
  )
}

export default Orders
