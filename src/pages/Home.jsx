import React, { useEffect, useMemo, useState } from 'react'
import FeaturedInfo from '../components/featuredInfo/FeaturedInfo';
import Graph from '../components/charts/Graph';
import { data } from '../dummyData';
import styled from 'styled-components';
import WidgetSm from '../components/widgetSm/WidgetSm';
import WidgetLg from '../components/widgetLg/WidgetLg';
import { userRequest } from '../requestMethods';

const HomeDiv = styled.div`
  flex: 4;
`

const HomeWidgets = styled.div`
  display: flex;
  margin: 20px
`

const Home = () =>  {
  const [userStats, setUserStats] = useState([])

  const MONTHS = useMemo(()=> [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ] ,[])

  useEffect(() => {
    const getStats = async() => {
      try{
        const res = await userRequest.get("/users/stats")
        res.data.map(item => {
          setUserStats(prev => [
            ...prev,
            {name: MONTHS[item._id-1], "ActiveUser": item.total}
          ])
        })
      }catch(error) {
        console.log(error)
      }
    }
    getStats()
  },[MONTHS])

  console.log(userStats)

  return (
    <HomeDiv >
      <FeaturedInfo/>
      <Graph data={userStats} title="User Analytics" grid dataKey="ActiveUser" />
      <HomeWidgets>
        <WidgetSm/>
        <WidgetLg/>
      </HomeWidgets>
    </HomeDiv>
  )
}

export default Home
