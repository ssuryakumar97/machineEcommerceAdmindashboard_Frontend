import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { userRequest } from '../requestMethods'

const OrderDiv = styled.div`
    flex: 4;
`

const Order = () => {
    const {id} = useParams()
    const [orderData, setOrderData] = useState()
    const [userData, setUserData] = useState()

    useEffect(()=>{
        const getOrdersUsers = async() => {
            const res = await userRequest.get(`/orders/getOrder/${id}`)
            const users = await userRequest.get(`/users/find/${res.data.userId}`)
            setOrderData(res.data)
            setUserData(users.data)
        }
        getOrdersUsers()
    },[])

    console.log(orderData)
    // console.log(userData)

  return (
    <OrderDiv>
      This is order page with {id}.
    </OrderDiv>
  )
}

export default Order
