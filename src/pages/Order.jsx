import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { BASE_URL, userRequest } from '../requestMethods'
import { toast, ToastContainer } from 'react-toastify'


const OrderDiv = styled.div`
    flex: 4;
`
const OrderDetailsDiv = styled.div`
  width: 95%;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
`
const UserDiv = styled.div`
  margin: 5px;
`

const Details = styled.h2`
  margin: 5px 0px;
`
const Image = styled.img`
  width: 100px;
  height: 100px;
`
const ProductDiv = styled.div`
  margin: 5px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const RightDiv = styled.div``

const DeliverySpan = styled.span`
  &.pending{
    background-color: blue;
    color: white;
    padding: 0 5px;
    border-radius: 5px;
  }
  &.delivered, &.received{
    background-color: #0acd0a;
    color: black;
    padding: 0 5px;
    border-radius: 5px;
  }
  &.declined{
    background-color: red;
    color: white;
    padding: 0 5px;
    border-radius: 5px;
  }
`


const Order = () => {
    const {id} = useParams()
    const [orderData, setOrderData] = useState()
    const [userData, setUserData] = useState()
    const [deliveryStatEdit,setDeliveryStatEdit] = useState(false)
    const [paymentStatEdit,setPaymentStatEdit] = useState(false)
    const [deliveryStatus, setDeliveryStatus]= useState("pending")
    const [paymentStatus, setPaymentStatus]= useState("pending")
    const [data, setData] =useState({})

    useEffect(()=>{
        const getOrdersUsers = async() => {
            const res = await userRequest.get(`/orders/getOrder/${id}`)
            // console.log(res.data)
            const users = await userRequest.get(`/users/find/${res.data.userId}`)
            setOrderData(res.data)
            setUserData(users.data)
        }
        getOrdersUsers()
    },[data])

    console.log(orderData)
    // console.log(userData)

    const handleDeliveryUpdate = async(e) => {
      const res = await userRequest.put(`/orders/${id}`, {deliveryStatus})
      console.log(res.data)
      setData(res.data)
      setDeliveryStatEdit(val => !val)
      toast.success("Data updated successfully")
      // setDeliveryStatus(e.target.value)
    }

    const handlePaymentUpdate = async(e) => {
      const res = await userRequest.put(`/orders/${id}`, {paymentStatus})
      setData(res.data)
      // console.log(res.data)
      setPaymentStatEdit(val => !val)
      toast.success("Data updated successfully")
    }

  return (
    <OrderDiv>
      <ToastContainer autoClose={2000}/>
      <OrderDetailsDiv>
        <Details>Details</Details>
        <div>
          <UserDiv>
            <strong>Email:</strong> &nbsp;&nbsp;{orderData?.email}
          </UserDiv>
          <UserDiv>
            <strong>Contact No:</strong>&nbsp;&nbsp;{orderData?.contactNo}
          </UserDiv>
          <UserDiv>
            <strong>Address:</strong>&nbsp;&nbsp;{orderData?.address}
          </UserDiv>
          <UserDiv>
            <strong>Products:</strong>&nbsp;&nbsp;
            {orderData?.products.map((val,ind) => {
              return (
                <ProductDiv key={ind}>
                  <LeftDiv>
                    <div>
                      <strong>Title:</strong> &nbsp;&nbsp;{val.title}
                    </div>
                    <div>
                      <strong>Description:</strong> &nbsp;&nbsp;{val.desc}
                    </div>
                    <div>
                      <strong>Category:</strong> &nbsp;&nbsp;{val.categories[0]}
                    </div>
                    <div>
                      <strong>Price:</strong> &nbsp;&nbsp;{val.pricePerQty}
                    </div>
                  </LeftDiv>
                  <RightDiv>
                    <Image src={`${BASE_URL}/image/download/${val?.img}`} />
                  </RightDiv>
                </ProductDiv>
              );
            })}
          </UserDiv>
          <UserDiv>
            <strong>Amount:</strong>&nbsp;&nbsp;{orderData?.amount}
          </UserDiv>
          <UserDiv>
            <strong>Discount Percentage:</strong>&nbsp;&nbsp;
            {orderData?.discountPercentage}%
          </UserDiv>
          <UserDiv>
            <strong>Discount:</strong>&nbsp;&nbsp;{orderData?.discount}
          </UserDiv>
          <UserDiv>
            <strong>Final Price:</strong>&nbsp;&nbsp;{orderData?.finalPrice}
          </UserDiv>
          <UserDiv>
            <strong>Delivery Status:</strong>&nbsp;&nbsp;
            {deliveryStatEdit ? (
              <>
                <select onChange={(e) => setDeliveryStatus(e.target.value)} value={deliveryStatus}>
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button onClick={handleDeliveryUpdate} >Update</button>
              </>
            ) : (
              <>
                <DeliverySpan className={orderData?.deliveryStatus}>{orderData?.deliveryStatus} </DeliverySpan>
                <button onClick={() => setDeliveryStatEdit(val => !val)}>Edit</button>
              </>
            )}{" "}
          </UserDiv>
          <UserDiv>
          <strong>Payment Status:</strong>&nbsp;&nbsp;
          {paymentStatEdit ? (
              <>
                <select onChange={(e) => setPaymentStatus(e.target.value)} value={paymentStatus}>
                  <option value="pending">Pending</option>
                  <option value="received">Received</option>
                  <option value="declined">Declined</option>
                </select>
                <button onClick={handlePaymentUpdate} >Update</button>
              </>
            ) : (
              <>
                <DeliverySpan className={orderData?.paymentStatus}>{orderData?.paymentStatus} </DeliverySpan>
                <button onClick={() => setPaymentStatEdit(val => !val)}>Edit</button>
              </>
            )}
          </UserDiv>
        </div>
      </OrderDetailsDiv>
    </OrderDiv>
  );
}

export default Order
