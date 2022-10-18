import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStats } from '../redux/actions/canadiensActions';
import '../App.css';

const baseURL = "https://statsapi.web.nhl.com";

const columns = [
    { field: 'name', headerName: 'Name', width: 200, headerClassName: 'super-app-theme--header',
        headerAlign: 'center' },
    { field: 'position', headerName: 'Pos', width: 70 },
    { field: 'games', headerName: 'GP', width: 70 },
    { field: 'goals', headerName: 'G', width: 70 },
    { field: 'assists', headerName: 'A', width: 70 },
    { field: 'points', headerName: 'P', width: 70 },
    { field: 'pointsPerGame', headerName: 'P/G', width: 70 },
    { field: 'plusMinus', headerName: '+/-', width: 70 },
    { field: 'gamescore', headerName: 'Gamescore', width: 100, 
        cellClassName: (params) => {
            if (params.value == null) {
                return '';
            }
    
            return clsx('super-app', {
                replacement: params.value < 0.1,
                topNine: params.value >= 0.2 && params. value < 0.5,
                topSix: params.value >= 0.5 && params. value < 1.00,
                star: params.value >= 1.00
            });
        }
    },
    { field: 'timeOnIce', headerName: 'TOI', width: 70 },
    { field: 'powerPlayGoals', headerName: 'PPG', width: 70 },
    { field: 'powerPlayPoints', headerName: 'PPA', width: 70 },
    { field: 'powerPlayPointsPer60', headerName: 'PPP/60', width: 70 },
    { field: 'shots', headerName: 'S', width: 70 },
    { field: 'shootingpercentage', headerName: 'S%', width: 70 },
    { field: 'faceoffPercentage', headerName: 'FO%', width: 70 },
];

let year = '20222023';

// function time2dec(tIn) {
//     try {
//         if(tIn == '') 
//             return 0;
//         if(tIn.indexOf('h') >= 0 || tIn.indexOf(':') >= 0)
//             return hm2dec(tIn.split(/[h:]/));
//         if(tIn.indexOf('m') >= 0)
//             return hm2dec([0,tIn.replace('m','')]);
//         if(tIn.indexOf(',') >= 0)
//             return parseFloat(tIn.split(',').join('.')).toFixed(2);
//         if(tIn.indexOf('.') >= 0)
//             return parseFloat(tIn);
//         return parseInt(tIn, 10);
//     }
//     catch(err){
//     };
// }

// function hm2dec(hoursMinutes) {
//     var hours = parseInt(hoursMinutes[0], 10);
//     var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
//     return (hours + minutes / 60).toFixed(2);
// }

// const getStats = (data) => {
//     let resArray = [];
//     const roster = data.roster;
//     roster.forEach((player, i) => {
//         let playerID = player.person.id;
//         let playerName = player.person.fullName;
//         let playerLink = player.person.link;
//         let playerPos = player.position.abbreviation;

//         let playerObject = {
//             id: playerID,
//             name: playerName,
//             position: playerPos
//         };

//         // console.log(`${baseURL}${playerLink}/stats?stats=statsSingleSeason&season=20212022`);
        
//         axios.get(`${baseURL}${playerLink}/stats?stats=statsSingleSeason&season=${year}`)
//             .then((res) => {
//             const playerStats = res.data;
//             console.log(playerStats);
//             if (playerStats.stats[0].splits.length == 0) {
//                 playerObject.games = 0;
//                 playerObject.goals = 0;
//                 playerObject.assists = 0;
//                 playerObject.points = 0;
//                 playerObject.pointsPerGame = 0;
//                 playerObject.plusMinus = 0;
//                 playerObject.powerPlayGoals = 0;
//                 playerObject.powerPlayPoints = 0;
//                 playerObject.powerPlayPointsPer60 = 0;
//                 playerObject.plusMinus = 0;
//                 playerObject.gamescore = 0;
//                 playerObject.timeOnIce = 0;
//                 playerObject.shots = 0;
//                 playerObject.shootingpercentage = 0;
//                 playerObject.faceoffPercentage = 0;

//             } else {
//                 const singlePlayer = playerStats.stats[0].splits[0].stat;

//                 playerObject.games = singlePlayer.games || 0;
//                 playerObject.goals = singlePlayer.goals || 0;
//                 playerObject.assists = singlePlayer.assists || 0;
//                 playerObject.points = singlePlayer.points || 0;
//                 playerObject.pointsPerGame = singlePlayer.points / singlePlayer.games || 0;
//                 playerObject.timeOnIce = singlePlayer.timeOnIcePerGame || 0;
//                 playerObject.plusMinus = singlePlayer.plusMinus || 0;
//                 playerObject.powerPlayGoals = singlePlayer.powerPlayGoals || 0;
//                 playerObject.powerPlayPoints = singlePlayer.powerPlayPoints || 0;
//                 playerObject.powerPlayPointsPer60 = ((
//                     singlePlayer.powerPlayPoints / time2dec(singlePlayer.powerPlayTimeOnIce)
//                     ) * 60 ).toFixed(2) || 0;
                
//                 if (isNaN(playerObject.powerPlayPointsPer60)) {
//                     playerObject.powerPlayPointsPer60 = 0.00;
//                 }
//                 playerObject.plusMinus = singlePlayer.plusMinus || 0;
//                 playerObject.shots = singlePlayer.shots;
//                 playerObject.shootingpercentage = singlePlayer.shotPct;
//                 playerObject.faceoffPercentage = singlePlayer.faceOffPct;

//                 playerObject.gamescore = ((
//                     (0.75 * singlePlayer.goals) +
//                     (0.635 * singlePlayer.assists) + 
//                     (0.075 * singlePlayer.shots) + 
//                     (0.05 * singlePlayer.blocked) -
//                     (0.15 * singlePlayer.penaltyMinutes)
//                 ) / singlePlayer.games).toFixed(2) || 0;

//                 if (isNaN(playerObject.gamescore)) {
//                     playerObject.gamescore = 0.00;
//                 }
//             }
//         });

//         resArray[i] = playerObject;

//     }); 
//     return(resArray);
// }

const Canadiens = () => {
    const players = useSelector((state) => state.canadiensReducer.players);
    
    return (
        <div className='canadiens-container'>
            <div style={{ height: '80vh', width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <Box
                            sx={{
                            height: '100%',
                            width: '100%',
                            '& .super-app-theme--cell': {
                                backgroundColor: '#f79eac'
                            },
                            '& .super-app.star': {
                                backgroundColor: '#abffc5'
                            },
                            '& .super-app.topSix': {
                                backgroundColor: '#defae7'
                            },
                            '& .super-app.topNine': {
                                backgroundColor: '#f0faf3'
                            },
                            '& .super-app.replacement': {
                                backgroundColor: '#facdd0'
                            },
                            }}
                        >
                            <DataGrid
                                initialState={{
                                    sorting: {
                                    sortModel: [{ field: 'points', sort: 'desc' }],
                                    },
                                }}
                                columns={columns}
                                rows={players}
                                // getRowId={(row) => row.internalId}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Canadiens