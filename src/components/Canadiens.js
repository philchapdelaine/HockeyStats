import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import axios from 'axios';
import '../App.css';

const baseURL = "https://statsapi.web.nhl.com";

const columns = [
    { field: 'name', headerName: 'Name', width: 240, headerClassName: 'super-app-theme--header',
        headerAlign: 'center' },
    { field: 'games', headerName: 'Games Played', width: 100 },
    { field: 'goals', headerName: 'Goals', width: 100 },
    { field: 'assists', headerName: 'Assists', width: 100 },
    { field: 'points', headerName: 'Points', width: 100 },
    { field: 'plusMinus', headerName: '+/-', width: 100 },
    { field: 'powerPlayGoals', headerName: 'Power Play Goals', width: 100 },
    { field: 'powerPlayPoints', headerName: 'Power Play Points', width: 100 },
    { field: 'powerPlayPointsPer60', headerName: 'Power Play Points per 60', width: 100 },
    { field: 'gamescore', headerName: 'Gamescore', width: 100 },
];

let year = '20212022';

function time2dec(tIn) {
    try {
        if(tIn == '') 
            return 0;
        if(tIn.indexOf('h') >= 0 || tIn.indexOf(':') >= 0)
            return hm2dec(tIn.split(/[h:]/));
        if(tIn.indexOf('m') >= 0)
            return hm2dec([0,tIn.replace('m','')]);
        if(tIn.indexOf(',') >= 0)
            return parseFloat(tIn.split(',').join('.')).toFixed(2);
        if(tIn.indexOf('.') >= 0)
            return parseFloat(tIn);
        return parseInt(tIn, 10);
    }
    catch(err){
    };
}

function hm2dec(hoursMinutes) {
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return (hours + minutes / 60).toFixed(2);
}

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

            playerObject.games = singlePlayer.games || 0;
            playerObject.goals = singlePlayer.goals || 0;
            playerObject.assists = singlePlayer.assists || 0;
            playerObject.points = singlePlayer.points || 0;
            playerObject.plusMinus = singlePlayer.plusMinus || 0;
            playerObject.powerPlayGoals = singlePlayer.powerPlayGoals || 0;
            playerObject.powerPlayPoints = singlePlayer.powerPlayPoints || 0;
            playerObject.powerPlayPointsPer60 = ((
                singlePlayer.powerPlayPoints / time2dec(singlePlayer.powerPlayTimeOnIce)
                ) * 60 ).toFixed(2) || 0;
            playerObject.plusMinus = singlePlayer.plusMinus || 0;

            playerObject.gamescore = ((
                (0.75 * singlePlayer.goals) +
                (0.635 * singlePlayer.assists) + 
                (0.075 * singlePlayer.shots) + 
                (0.05 * singlePlayer.blocked) -
                (0.15 * singlePlayer.penaltyMinutes)
            ) / singlePlayer.games).toFixed(2) || 0;
        });

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
    // console.log(tableData);

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