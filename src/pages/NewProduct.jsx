import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../requestMethods'
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const NewProductDiv = styled.div`
    flex: 4;
`
const AddProductTitle = styled.h1``
const AddProductForm = styled.form`
    margin-top: 10px;
`
const AddProductItem = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    label{
        color: gray;
        font-weight: 600;
        margin-bottom: 10px;
    };
    input{
        padding: 10px;
    };
    select{
        padding: 10px;
    }
`
const AddProductButton = styled.button`
    &.normal{
        margin-top: 10px;
        padding: 7px 10px;
        border: none;
        border-radius: 10px;
        background-color: darkblue;
        color: white;
        font-weight: 600;
        cursor: pointer;
    } 
    &.disable{
        margin-top: 10px;
        padding: 7px 10px;
        border: none;
        border-radius: 10px;
        background-color: #5050ff;
        color: white;
        font-weight: 600;
        cursor: not-allowed;
    } 
`

const ProductInfoImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 10px;
    object-fit: contain;
    margin-right: 20px;
`

const NewProduct = () => {
    const [image, setImage] = useState()
    const [file, setFile] = useState(null)
    const initialValues = {
        img:"",
        title: "",
        categories: ["assembly"],
        desc: "",
        size: ["small"],
        price: 0
    }
    const [data, setData] = useState(initialValues)
    const [disableButton, setDisableButton] = useState(false)
    const inputFile = useRef()

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

    const handleClick = async(e) => {
        e.preventDefault()
        setDisableButton(true)
        const form = new FormData()
        form.append("image", image)
        const result = await userRequest.post("image/uploadImage", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(result.data)
        const obj = {...data, img:result.data.name, imageId:result.data.id }
        const updateProduct = await userRequest.post("/products", obj)
        console.log(updateProduct.data)
        toast.success("New product added")
        inputFile.current.type = "text"
        inputFile.current.type = "file"
        setFile(null)
        setData(initialValues)
        setDisableButton(false)
    }
    
  return (
    <NewProductDiv>
        <ToastContainer autoClose={2000} />
        <AddProductTitle>New Product</AddProductTitle>
        <AddProductForm>
            <AddProductItem>
            <ProductInfoImg src={file==null ?"https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg": file}/>
                <label>Image</label>
                <input type="file" id='file' onChange={handleImageChange} ref={inputFile} required/>
            </AddProductItem>
            <AddProductItem>
                <label>Category</label>
                <select name="categories" onChange={handleChange} value={data.categories[0]} required>
                    <option value="assembly">Assembly Machine</option>
                    <option value="turning">Turning Machine</option>
                    <option value="moulding">Moulding Machine</option>
                    <option value="welding">Welding Machine</option>
                    <option value="accessories">Machine Accessories</option>
                </select>
            </AddProductItem>
            <AddProductItem>
                <label>Name</label>
                <input type="text" placeholder='Machine name' name='title' onChange={handleChange} value={data.title} required/>
            </AddProductItem>
            <AddProductItem>
                <label>Description</label>
                <input type="text" placeholder='Description' name='desc' onChange={handleChange} value={data.desc} required/>
            </AddProductItem>
            <AddProductItem>
                <label>Size</label>
                <select name="size" onChange={handleChange} value={data.size[0]} required>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </AddProductItem>
            <AddProductItem>
                <label>Price</label>
                <input type="number" placeholder='1000' name='price' onChange={handleChange} value={data.price} required/>
            </AddProductItem>
            <AddProductButton className={disableButton? "disable": "normal"} onClick={handleClick} disabled={disableButton}>Create</AddProductButton>
        </AddProductForm>
    </NewProductDiv>
  )
}

export default NewProduct
