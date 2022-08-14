import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import axios from 'axios';
import '../App.css'

const baseURL = "https://statsapi.web.nhl.com";

const columns = [
    { field: 'name', headerName: 'Name', width: 240, headerClassName: 'super-app-theme--header',
        headerAlign: 'center' },
    { field: 'points', headerName: 'Points', width: 100 },
];

let year = '20212022';

const getStats = (data) => {
    let resArray = [];
    const roster = data.roster;
    roster.forEach((player, i) => {
        let playerID = player.person.id;
        let playerName = player.person.fullName;
        let playerLink = player.person.link;

        let playerObject = {
            id: playerID,
            name: playerName
        };

        // console.log(`${baseURL}${playerLink}/stats?stats=statsSingleSeason&season=20212022`);
        
        axios.get(`${baseURL}${playerLink}/stats?stats=statsSingleSeason&season=${year}`)
            .then((res) => {
            const playerStats = res.data;
            const singlePlayer = playerStats.stats[0].splits[0].stat;
            
            playerObject.points = singlePlayer.points || 0;
        })

        resArray[i] = playerObject;

    }); 
    return(resArray);
}

const Canadiens = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        axios.get(`${baseURL}/api/v1/teams/8/roster`)
            .then((res) => {
            const players = res.data;
            let parsedPlayers = getStats(players);
            setTableData(parsedPlayers);
        })
        }, [])
    console.log(tableData)

  return (
    <div className='canadiens-container'>
        <div style={{ height: '80vh', width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        initialState={{
                            sorting: {
                            sortModel: [{ field: 'points', sort: 'desc' }],
                            },
                        }}
                        columns={columns}
                        rows={tableData}
                        // getRowId={(row) => row.internalId}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Canadiens