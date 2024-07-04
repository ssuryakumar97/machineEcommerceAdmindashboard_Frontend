import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { productRows } from "../dummyData";
import {Link} from "react-router-dom"
import { BASE_URL, userRequest } from '../requestMethods';
import { ToastContainer, toast } from 'react-toastify';

const ProductListDiv = styled.div`
    flex: 4;
`
const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

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

const ProductList = () => {
    const [data, setData] = useState([])

    useEffect(() => {
      const getProducts = async() => {
        const res = await userRequest.get("/products")
        console.log(res.data)
        setData(res.data)
      }
      getProducts()
    },[])


    const handleDelete = async(val) => {
      // const deleteImage = await userRequest.delete(`image/delete/${val.imageId}`)
      const deleteProduct = await userRequest.delete(`products/${val._id}`)
      toast.success("Data deleted successfully")
      setData(data.filter(item => item._id !== val._id))
    }
    
      const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        {
          field: "title",
          headerName: "Product",
          width: 180,
          renderCell: (params) => {
            return (
              <ProductListItem>
                <ProductListImg src={`${BASE_URL}/image/download/${params.row.img}`} alt="Product Image" />
                {params.row.title}
              </ProductListItem>
            );
          },
        },
        {
          field: "price",
          headerName: "Price",
          width: 120,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <ProductListEditDiv>
                <Link to={"/product/"+params.row._id}>
                  <ProductListEditButton>Edit</ProductListEditButton>
                </Link>
                <DeleteOutlineIconStyled onClick={()=>handleDelete(params.row)}/>
              </ProductListEditDiv>
            );
          },
        },
      ];
      return (
        <ProductListDiv>
          <ToastContainer autoClose={2000} />
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
        </ProductListDiv>
      );
}

export default ProductList
