import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { userRequest } from '../../requestMethods';

const ChartDiv = styled.div`
  margin: 20px;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.75);
` 
const ChartTitle = styled.h3`
   margin-bottom: 20px;
`

const Bargraph = () => {
    
    const [monthlySales, setMonthlySales] = useState([])

  

  useEffect(() => {
    const getSales = async () => {
        try {
          const res = await userRequest.get("/orders/sales");
          const arr = [...res.data]
          const  newArr = arr.filter((item,index) => {
            return index === arr.findIndex( o => item.month == o.month) 
          })
          const salArr = []
          const monthData = ["January","February","March","April","May","June","July","August","September","October","November","December"];
          for(let ind=0; ind<newArr.length; ind++){
            for(let jnd=0; jnd<arr.length; jnd++){
                if(newArr[ind].month == arr[jnd].month){
                    if(salArr[ind]?.count >= 1){
                      let someObj = {
                        month : newArr[ind].month,
                        monthName: monthData[newArr[ind].month-1],
                        products: [...salArr[ind].products,...newArr[ind].products],
                        monthlyProducts: salArr[ind].products.length + newArr[ind].products.length,
                        count: salArr[ind].count + 1,
                        _id: newArr[ind]._id
                      }
                      salArr[ind] = someObj
                    } else {
                        let someObj = {
                          month : newArr[ind].month,
                          monthName: monthData[newArr[ind].month-1],
                          products: [...newArr[ind].products],
                          monthlyProducts: newArr[ind].products.length,
                          count: 1,
                          _id: newArr[ind]._id
                        }
                        salArr[ind] = someObj
                    }
                }
            }
          }
          setMonthlySales(val => [...salArr])

        } catch (err) {
          console.log(err);
        }
      };
      getSales();
  },[])

  console.log(monthlySales)

  return (
    <ChartDiv>
    <ChartTitle>Sales</ChartTitle>
    {/* <LineChart/> */}
    <ResponsiveContainer width="100%" aspect={4 / 1}>
    <BarChart
          width={500}
          height={300}
          data={monthlySales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthName" stroke='#5550bd'/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="monthlyProducts" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
      </BarChart>
    </ResponsiveContainer>
   </ChartDiv>
  )
}

export default Bargraph
