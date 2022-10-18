import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import axios from 'axios';
import '../App.css'

const baseURL = "https://statsapi.web.nhl.com/api/v1";

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          border: 0,
          height: "1px"
      }}
  />
);

const Today = () => {
    const [tableData, setTableData] = useState({})

    useEffect(() => {
        axios.get(`${baseURL}/schedule`)
          .then((res) => {
            const games = res.data;
            setTableData(games);
        })
      }, [])
       console.log(tableData)

  return (
    <div className='today-container'>
      <div className='games'>
        <p className='today-title'>Games Today:</p>
        <ColoredLine color="#E1E8ED" />
        {
            tableData.totalGames === 0 ?
            <div className='no-games'>No Games Today</div>
            :
            <div>Yes, there are games today: TODO Add Games</div>
        }
      </div>
      
      <div className='twitter'>
        <p className='today-title'>Habs News:</p>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="HabsEOTP"
          options={{height: 600}}
          noHeader
          noFooter
          noScrollbar
        />
      </div>

      <div className='twitter'>
        <p className='today-title'>Around the League:</p>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="JFreshHockey"
          options={{height: 600}}
          noHeader
          noFooter
          noScrollbar
        />
      </div>


    </div>
  )
}

export default Today