import * as React from 'react';
import styled from 'styled-components';
// import { LineChart } from '@mui/x-charts/LineChart';
import { LineChart, Line, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

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


const Chart = ({data, dataKey, grid, title}) => {
  
  

  return (
   <ChartDiv>
    <ChartTitle>{title}</ChartTitle>
    {/* <LineChart/> */}
    <ResponsiveContainer width="100%" aspect={4 / 1}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke='#5550bd'/>
        <Line type="monotone" dataKey={dataKey} stroke='#5550bd'/>
        <Tooltip />
        {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>}
      </LineChart>
    </ResponsiveContainer>
   </ChartDiv>
  );
}

export default Chart