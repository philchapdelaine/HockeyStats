import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import axios from 'axios';
import '../App.css'

const baseURL = "https://statsapi.web.nhl.com/api/v1";

const columns = [
    { field: 'name', headerName: 'Name', width: 240, headerClassName: 'super-app-theme--header',
        headerAlign: 'center' },
    { field: 'gp', headerName: 'GP', width: 100 },
    { field: 'wins', headerName: 'Wins', width: 100 },
    { field: 'losses', headerName: 'Losses', width: 100 },
    { field: 'otls', headerName: 'OTLs', width: 100 },
    { field: 'points', headerName: 'Points', width: 100 },
];

// Just an example
// const rowsExample = [
//     { id: 1, name: 'Canadiens', wins: 60, losses: 22, otls: 10, points: 80 },
//     { id: 2, name: 'Canucks', wins: 50, losses: 32, otls: 10, points: 80  }
// ];

const parseJSON = (data) => {
    let resArray = [];
    data.teamRecords.forEach((teamObject, i) => {
        let teamName = teamObject.team.name;
        let teamGP = teamObject.gamesPlayed;
        let teamWins = teamObject.leagueRecord.wins
        let teamLosses = teamObject.leagueRecord.losses
        let teamOTLS = teamObject.leagueRecord.ot
        let teamPoints = teamObject.points

        resArray[i] = {
            id: i,
            name: teamName,
            gp: teamGP,
            wins: teamWins,
            losses: teamLosses,
            otls: teamOTLS,
            points: teamPoints
        };
    });
    return(resArray);
};

// axios.get(`${baseURL}/standings?season=20212022/byConference`)
//       .then(res => {
//         const persons = res.data;
//         this.setState({ persons });
//       })

const Standings = () => {
    const [easternTableData, setEasternTableData] = useState([])
    const [westernTableData, setWesternTableData] = useState([])
    useEffect(() => {
        axios.get(`${baseURL}/standings/byConference`)
          .then((res) => {
            const easternStandings = res.data.records[0];
            const westernStandings = res.data.records[1];

            const parsedEasternStandings = parseJSON(easternStandings);
            setEasternTableData(parsedEasternStandings);
            const parsedWesternStandings = parseJSON(westernStandings);
            setWesternTableData(parsedWesternStandings);
        })
      }, [])
       console.log(easternTableData)
    
    return (
        <div className='standings-container'>
            Eastern Conference
            <div style={{ height: '80vh', width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid 
                            columns={columns}
                            rows={easternTableData}
                            // getRowId={(row) => row.internalId}
                         />
                    </div>
                </div>
            </div>

            Western Conference
            <div style={{ height: '80vh', width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid 
                            columns={columns}
                            rows={westernTableData}
                            // getRowId={(row) => row.internalId}
                         />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Standings