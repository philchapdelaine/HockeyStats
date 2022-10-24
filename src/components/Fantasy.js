import React from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import '../App.css'

const columns = [
    { field: 'name', headerName: 'Name', width: 200, headerClassName: 'super-app-theme--header',
        headerAlign: 'center' },
    { field: 'position', headerName: 'Pos', width: 70 },
    { field: 'fantasyPTS', headerName: 'FPts', width: 70 },
    { field: 'fantasyPTSPerGame', headerName: 'FPts/G', width: 70 },
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
                topNine: params.value >= 0.2 && params.value < 0.5,
                topSix: params.value >= 0.5 && params.value < 1.00,
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

const Fantasy = () => {

    const players = useSelector((state) => state.playerReducer.players);
    const goalValue = useSelector((state) => state.playerReducer.goalValue);
    const assistValue = useSelector((state) => state.playerReducer.assistValue);
    const ppgValue = useSelector((state) => state.playerReducer.ppgValue);
    const ppaValue = useSelector((state) => state.playerReducer.ppaValue);
    const shgValue = useSelector((state) => state.playerReducer.shgValue);
    const shaValue = useSelector((state) => state.playerReducer.shaValue);
    const gwgValue = useSelector((state) => state.playerReducer.gwgValue);
    const shotValue = useSelector((state) => state.playerReducer.shotValue);
    const hitValue = useSelector((state) => state.playerReducer.hitValue);
    const blockValue = useSelector((state) => state.playerReducer.blockValue);
    const winValue = useSelector((state) => state.playerReducer.winValue);
    const goalsAgainstValue = useSelector((state) => state.playerReducer.goalsAgainstValue);
    const saveValue = useSelector((state) => state.playerReducer.saveValue);
    const shutoutValue = useSelector((state) => state.playerReducer.shutoutValue);
    
    return (
        <div className='skaters-container'>
            <div style={{ height: '80vh', width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                <div className='fantasy-sidebar'>
                    <div className='fantasy-sidebar-header'>Scoring:</div>
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="Goal"
                    defaultValue={goalValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="Assist"
                    defaultValue={assistValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="PPG"
                    defaultValue={ppgValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="PPA"
                    defaultValue={ppaValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="SHG"
                    defaultValue={shgValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="SHA"
                    defaultValue={shaValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="GWG"
                    defaultValue={gwgValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="Shot"
                    defaultValue={shotValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="Hit"
                    defaultValue={hitValue}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: {sm: 55, md: 55},
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="Block"
                    defaultValue={blockValue}
                    />
                    <Button className="fantasy-button" variant="contained">Go</Button>
                </div>
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
                                    sortModel: [{ field: 'fantasyPTSPerGame', sort: 'desc' }],
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

export default Fantasy