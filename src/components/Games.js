import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import axios from 'axios';
import '../App.css'

const baseURL = "https://statsapi.web.nhl.com/api/v1";

const Games = () => {
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
    <div>
    {
        tableData.totalGames === 0 ?
        <div>No Games Today</div>
        :
        <div>Todo Add Games</div>
    }
    </div>
  )
}

export default Games