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
    const [deletedData, setDeletedData] = useState()
    
    useEffect(() => {
        const getOrders = async() => {
          const res = await userRequest.get("/orders")
          console.log(res.data)
          setData(res.data)
        }
        getOrders()
      },[deletedData])

      const handleDelete = async(val) => {
        const deleteData = await userRequest.delete(`/orders/${val._id}`)
        setDeletedData(deleteData.data)
        toast.success("Data deleted successfully")
      }

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
          field: "paymentStatus",
          headerName: "Payment Status",
          width: 120,
          renderCell: (params) => {

            if(params.row.paymentStatus == "received"){

              return (
                <div style={{color: "green"}}>Received</div>
              );
            } else if(params.row.paymentStatus == "pending") {

              return (
                <div style={{color: "blue"}}>Pending</div>
              );
            } else {
              return (
                <div style={{color: "red"}}>Failed</div>
              );
            }
          },
        },
        {
          field: "deliveryStatus",
          headerName: "Delivery Status",
          width: 120,
          renderCell: (params) => {

            if(params.row.deliveryStatus == "delivered"){

              return (
                <div style={{color: "green"}}>Delivered</div>
              );
            }  else {
              return (
                <div style={{color: "blue"}}>{params.row.deliveryStatus.charAt(0).toUpperCase() + params.row.deliveryStatus.slice(1)}</div>
              );
            }
          },
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
      <ToastContainer autoClose={2000}/>
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
