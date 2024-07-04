import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
// import Graph from "../components/charts/Graph"
// import { productData } from "../dummyData";
import {Upload} from '@mui/icons-material';
import { userRequest } from "../requestMethods";
import { BASE_URL } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";

const ProductDiv = styled.div`
  flex: 4;
`;

const ProductTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ProductTitle = styled.h1``
const ProductAddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`

const ProductTopContainer = styled.div`
    display: flex;
    
`
const ProductTopRight = styled.div`
    flex: 1;
    padding: 20px;
    margin:20px;
    -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
`
const ProductInfoTop = styled.div`
    display: flex;
    align-items: center;
`
const ProductInfoBottom = styled.div`
    margin-top: 10px;
`
const ProductInfoImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 10px;
    object-fit: contain;
    margin-right: 20px;
`

const ProductName = styled.span`
    font-weight: 900;
`
const ProductInfoItem = styled.div`
    width: 300px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
`
const ProductInfoKey = styled.span`
    font-weight: 600;
`
const ProductInfoValue = styled.span`
    font-weight: lighter;
`

const ProductBottomContainer = styled.div`
    padding: 20px;
    margin:20px;
    -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
`

const ProductForm = styled.form`
    display:flex;
    justify-content: space-between;
`
const ProductFormLeft = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    margin-bottom: 10px;
    color: gray;
`

const Input = styled.input`
        margin-bottom: 10px;
        border: none;
        padding: 5px;
        border-bottom: 1px solid gray;
`

const Select = styled.select`
    margin-bottom: 10px;
`

const ProductFormRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductUpload = styled.div`
    display: flex;
    align-items: center;
`
const ProductUploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`
const ProductUploadButton = styled.button`
    &.normal{
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
    };
    &.disable{
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: #7676f8;
    color: white;
    font-weight: 600;
    cursor: not-allowed;
    }
`

const Product = () => {
    const [productData, setProductData] = useState(null)
    const [file, setFile]= useState(null)
    const {id} = useParams()
    // console.log(typeof id)
    const [image, setImage]= useState()
    const initialValues = {
        img:"",
        title: "",
        categories: ["assembly"],
        desc: "",
        size: ["small"],
        price: ""
    }
    const [data, setData] = useState(initialValues)
    const [disableButton, setDisableButton] = useState(false)

    useEffect(()=>{
        const getProductData = async() => {
            try {
                const res = await userRequest.get(`/products/find/${id}`)
            setProductData(res.data)
            } catch (error) {
                console.log(error)
            }
            
        }
        getProductData()
    },[])

    const handleImageChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    const handleChange = (e) => {
        if(e.target.name == "size" || e.target.name == "categories")
            {
                const obj = {[e.target.name]: [e.target.value]}
                setData((val) => ({...val, ...obj}))
            } else if(e.target.name == "price") {
                const obj = {[e.target.name]: +e.target.value}
                setData((val) => ({...val, ...obj}))
            } else {
                const obj = {[e.target.name]: e.target.value}
                setData((val) => ({...val, ...obj}))
            }
        
    }
    // console.log(data)

    const handleClick = async(e) => {
        e.preventDefault()
        setDisableButton(true)
        // const deleteImage = await userRequest.delete(`image/delete/${productData?.imageId}`)
        const form = new FormData()
        form.append("image", image)
        const result = await userRequest.post("image/uploadImage", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(result.data)
        const obj = {...data, img:result.data.name, imageId:result.data.id }
        const updateProduct = await userRequest.put(`/products/${productData?._id}`, obj)
        console.log(updateProduct.data)
        toast.success("Product updated successfully")
        setFile(null)
        setData(initialValues)
        setDisableButton(false)
    }

    // console.log(productData)
  return (
  <ProductDiv>
    <ToastContainer autoClose={2000}/> 
    <ProductTitleContainer>
        <ProductTitle>Product</ProductTitle>
       <Link to='/newProduct'>
        <ProductAddButton>Create</ProductAddButton>
       </Link>
    </ProductTitleContainer>
    <ProductTopContainer>
        <ProductTopRight>
            <ProductInfoTop>
                <ProductInfoImg src={`${BASE_URL}/image/download/${productData?.img}`}/>
                <ProductName>{productData?.title.charAt(0).toUpperCase() + productData?.title.slice(1)}</ProductName>
            </ProductInfoTop>
            <ProductInfoBottom>
                <ProductInfoItem>
                    <ProductInfoKey>Id: </ProductInfoKey>
                    <ProductInfoValue>{productData?._id}</ProductInfoValue>
                </ProductInfoItem>
                <ProductInfoItem>
                <ProductInfoKey>Description:</ProductInfoKey>
                <ProductInfoValue>{productData?.desc}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
                <ProductInfoKey>Price:</ProductInfoKey>
                <ProductInfoValue>₹{productData?.price}</ProductInfoValue>
            </ProductInfoItem>
            </ProductInfoBottom>
        </ProductTopRight>
    </ProductTopContainer>
    <ProductBottomContainer>
        <ProductForm>
            <ProductFormLeft>
                <Label>Product Name</Label>
                <Input type="text" placeholder="Product Name" name="title" onChange={handleChange} value={data.title} required/>
                <Label>Category</Label>
                <Select name="categories" onChange={handleChange} value={data.categories[0]} required>
                    <option value="assembly">Assembly Machine</option>
                    <option value="turning">Turning Machine</option>
                    <option value="moulding">Moulding Machine</option>
                    <option value="welding">Welding Machine</option>
                    <option value="accessories">Machine Accessories</option>
                </Select>
                <Label>Description</Label>
                <Input type="text" placeholder="Description" name="desc" onChange={handleChange} value={data.desc} required/>
                <Label>Size</Label>
                <Select name="size" onChange={handleChange} value={data.size[0]} required>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </Select>
                <Label>Price</Label>
                <Input type="number" placeholder="Price" name="price" onChange={handleChange} value={data.price} required/>
            </ProductFormLeft>
            <ProductFormRight>
                <ProductUpload>
                    <ProductUploadImg src={file==null ?"https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg": file} alt="Apple Airpods"/>
                    <Label htmlFor="file">
                        <Upload/>
                    </Label>
                    <Input type="file" id="file" style={{display: "none"}} onChange={handleImageChange} required/>
                </ProductUpload>
                <ProductUploadButton disabled={disableButton} className={disableButton ? "disable": "normal"} onClick={handleClick}>Update</ProductUploadButton>
            </ProductFormRight>
        </ProductForm>
    </ProductBottomContainer>
  </ProductDiv>
  );
};

export default Product;
