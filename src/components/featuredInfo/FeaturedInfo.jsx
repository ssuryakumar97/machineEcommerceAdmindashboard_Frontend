import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { userRequest } from "../../requestMethods";

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

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [sales, setSales] = useState([])
  const [salesPercentage, setSalesPercentage] = useState(0)
  const [totalProducts, setTotalProducts] = useState([])

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        // console.log(res.data);
        setIncome(res.data);
        setPercentage((res.data[1].total * 100) / res.data[0].total - 100);
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
    const getSales = async () => {
      try {
        const res = await userRequest.get("/orders/sales");
        console.log(res.data);
        setSales(res.data);
        res.data.map((val) => setTotalProducts((da) => [...da, ...val.products]) )
        setSalesPercentage((res.data[res.data.length-1].products.length * 100) / res.data[res.data.length-2].products.length - 100);
      } catch (err) {
        console.log(err);
      }
    };
    getSales();
  }, []);

  console.log(sales[1]?.products.length);
  console.log(totalProducts);

  return (
    <Featured>
      <FeaturedItem>
        <FeaturedTitle>Revenue</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>₹{income[1]?.total}</FeaturedMoney>
          <FeaturedMoneyRate>
            {Math.floor(percentage)}%{" "}
            {percentage < 0 ? <StyledArrowDownward /> : <StyledArrowUpward />}{" "}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
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
      <FeaturedItem>
        <FeaturedTitle>Product Sold This Month</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>{sales[1]?.products.length}</FeaturedMoney>
        </FeaturedMoneyContainer>
      </FeaturedItem>
    </Featured>
  );
};

export default FeaturedInfo;
