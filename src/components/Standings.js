import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import axios from 'axios';

const baseURL = "https://statsapi.web.nhl.com/api/v1";


const columns = [
    { field: 'name', headerName: 'Name', width: 260 },
    { field: 'wins', headerName: 'Wins', width: 130 },
    { field: 'losses', headerName: 'Losses', width: 130 },
];

const rows = [
    { id: 1, name: 'Canadiens', wins: 60, losses: 22 },
    { id: 2, name: 'Canucks', wins: 50, losses: 32 },
    { id: 3, name: 'Flames', wins: 55, losses: 27 }
];

const parseJSON = (data) => {
    let resArray = []
    data.records[0].teamRecords.forEach((teamObject, i) => {
        let teamName = teamObject.team.name;
        let teamWins = teamObject.leagueRecord.wins
        let teamLosses = teamObject.leagueRecord.losses
        resArray[i] = {
            id: i,
            name: teamName,
            wins: teamWins,
            losses: teamLosses
        };
    })
    console.log('hello');
    console.log(resArray);
    return(resArray);
};

// axios.get(`https://jsonplaceholder.typicode.com/users`)
//       .then(res => {
//         const persons = res.data;
//         this.setState({ persons });
//       })

const Standings = () => {
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        axios.get(`${baseURL}/standings?season=20212022`)
          .then((res) => {
            const standings = res.data
            const parsedStandings = parseJSON(standings);
            setTableData(parsedStandings)
        })
      }, [])
       console.log(tableData)



    
    return (
        <div className='standings-container'>
            <div style={{ height: '80vh', width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid 
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

export default Standings