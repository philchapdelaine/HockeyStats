import React, { useState, useEffect } from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import '../App.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchStandings } from '../redux/actions/standingsActions';

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

const Standings = () => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchStandings());
    //   }, [])
    
    const easternTableData = useSelector((state) => state.standingsReducer.eastern);
    const westernTableData = useSelector((state) => state.standingsReducer.western);
    
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