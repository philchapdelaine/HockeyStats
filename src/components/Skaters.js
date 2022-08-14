import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import axios from 'axios';
import '../App.css'

const baseURL = "https://statsapi.web.nhl.com/api/v1";
const url = "https://api.nhle.com/stats/rest/en/skater/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22gamesPlayed%22,%22direction%22:%22ASC%22%7D,%7B%22property%22:%22playerId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=400&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3C=20212022%20and%20seasonId%3E=20212022";

const Skaters = () => {
    const [tableData, setTableData] = useState([]);
    // useEffect(() => {
    //     axios.get(url)
    //         .then((res) => {
    //         const players = res.data;
    //         setTableData(players);
    //     })
    //     }, [])
    // console.log(tableData)

    return (
        <div>Skaters</div>
    )
}

export default Skaters