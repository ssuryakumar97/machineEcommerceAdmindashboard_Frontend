import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../../requestMethods'
import {format} from 'timeago.js'
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
// import TimeAgo from 'react-timeago'


// TimeAgo.addDefaultLocale(en)
// const timeAgo = new TimeAgo('en-US')
const WidgetLgDiv = styled.div`
    flex:2;
    -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  padding: 20px;
`

const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`

const WidgetLgTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`
const WidgetLgTr = styled.tr``
const WidgetLgTh = styled.th`
  text-align: left;
`
const WidgetLgTdUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`
const WidgetLgTdDate = styled.td`
  font-weight: 200;
`
const WidgetLgTdAmount = styled.td`
  font-weight: 200;
`
const WidgetLgTdStatus = styled.td``

const WidgetLgImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`

const WidgetLgName = styled.span``

const WidgetLgButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  &.received{
    background-color: #e5faf2;
    color: #15ca15;
  };
  &.pending{
    background-color: #ebf1fe;
    color: #524ae1;
  }
  &.declined{
    background-color: #fff0f1;
    color: #ed3330;
  }
`

const WidgetLg = () => {
  const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async() => {
            try {
                const res = await userRequest.get("/orders")
                setOrders(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getOrders()
    },[])

    console.log(orders)
    
const Button = ({type}) => {
  return <WidgetLgButton className={type}>{type}</WidgetLgButton>
}

  return (
    <WidgetLgDiv>
      <WidgetLgTitle>Latest transactions</WidgetLgTitle>
      <WidgetLgTable>
        <thead>
        <WidgetLgTr>
          <WidgetLgTh>Customer</WidgetLgTh>
          <WidgetLgTh>Date</WidgetLgTh>
          <WidgetLgTh>Amount</WidgetLgTh>
          <WidgetLgTh>Payment Status</WidgetLgTh>
        </WidgetLgTr>
        </thead>
        <tbody>
        {orders.map((order) => (
          <WidgetLgTr key={order._id}>
          <WidgetLgTdUser>
            <WidgetLgImg src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s' alt=''></WidgetLgImg>
            <WidgetLgName>{order.userId}</WidgetLgName>
          </WidgetLgTdUser>
          <WidgetLgTdDate>{format(order.createdAt)}</WidgetLgTdDate>
          {/* <WidgetLgTdDate><TimeAgo date={new Date(order.createdAt)}/></WidgetLgTdDate> */}
          <WidgetLgTdAmount>₹{order.amount}</WidgetLgTdAmount>
          <WidgetLgTdStatus><Button type={order.paymentStatus}/></WidgetLgTdStatus>
        </WidgetLgTr>
        ))}
       
        </tbody>
      </WidgetLgTable>
    </WidgetLgDiv>
  )
}

export default WidgetLg
