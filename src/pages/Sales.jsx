import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Bargraph from '../components/charts/Bargraph'
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { userRequest } from '../requestMethods';

const SalesDiv = styled.div`
  flex: 4;
`

const Featured = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const FeaturedItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.75);
`;
const FeaturedTitle = styled.span`
  font-size: 20px;
`;
const FeaturedMoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;
const FeaturedMoney = styled.span`
  font-size: 30px;
  font-weight: 600;
`;
const FeaturedMoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const StyledArrowDownward = styled(ArrowDownward)`
  font-size: 14px;
  margin-left: 5px;
  color: red;
`;

const StyledArrowUpward = styled(ArrowUpward)`
  font-size: 14px;
  margin-left: 5px;
  color: green;
`;
const FeaturedSub = styled.div`
  font-size: 15px;
  color: gray;
`;

const Sales = () => {
  const [sales, setSales] = useState([])
  const [salesPercentage, setSalesPercentage] = useState(0)
  const [totalProducts, setTotalProducts] = useState([])
  const [monthlySales, setMonthlySales] = useState([])

  useEffect(() => {
    const getSales = async () => {
        try {
          const res = await userRequest.get("/orders/sales");
          setSales(res.data);
          res.data.map((val) => setTotalProducts((da) => [...da, ...val.products]) )
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

          console.log((salArr[salArr.length-1].products?.length * 100) / salArr[salArr.length-2].products?.length - 100)
          setSalesPercentage((salArr[salArr.length-1].products?.length * 100) / salArr[salArr.length-2].products?.length - 100);
        } catch (err) {
          console.log(err);
        }
      };
      getSales();
  },[])
  return (
    <SalesDiv>
      <Featured>

        <FeaturedItem>
        <FeaturedTitle>Total Products Sold</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>{totalProducts.length}</FeaturedMoney>
          <FeaturedMoneyRate>
            {salesPercentage}% {" "}  {salesPercentage < 0 ? <StyledArrowDownward /> : <StyledArrowUpward />}{" "}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      </Featured>
        <Bargraph/>
    </SalesDiv>
  )
}

export default Sales
