import React from 'react'
import { DataGrid, } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { updatePlayerStats } from '../redux/actions/playerActions';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../App.css'

const columns = [
    { field: 'name', headerName: 'Name', width: 160, headerClassName: 'super-app-theme--header',
        headerAlign: 'center' },
    { field: 'position', headerName: 'Pos', width: 70, headerClassName: 'super-app-theme--header'},
    { field: 'fantasyPTS', headerName: 'FPts', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'fantasyPTSPerGame', headerName: 'FPts/G', width: 90, headerClassName: 'super-app-theme--header' },
    { field: 'games', headerName: 'GP', width: 70, headerClassName: 'super-app-theme--header'},
    { field: 'goals', headerName: 'G', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'assists', headerName: 'A', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'points', headerName: 'P', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'pointsPerGame', headerName: 'P/G', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'plusMinus', headerName: '+/-', width: 70, headerClassName: 'super-app-theme--header' },
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
        }, 
        headerClassName: 'super-app-theme--header'
    },
    { field: 'timeOnIce', headerName: 'TOI', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'powerPlayGoals', headerName: 'PPG', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'powerPlayPoints', headerName: 'PPA', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'powerPlayPointsPer60', headerName: 'PPP/60', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'shots', headerName: 'S', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'shootingpercentage', headerName: 'S%', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'faceoffPercentage', headerName: 'FO%', width: 70, headerClassName: 'super-app-theme--header' },
];

const Fantasy = () => {

    const dispatch = useDispatch();
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
    
    const [goal, setGoal] = useState(goalValue);
    const [assist, setAssist] = useState(assistValue);

    const onChangeGoal = (event) => {
        setGoal(event.target.value);
    }

    const onChangeAssist = (event) => {
        setAssist(event.target.value);
    }

    const onClick = () => {
        let statValues = {};
        statValues.goalValue = goal;
        statValues.assistValue = assist;
        dispatch(updatePlayerStats(statValues));
    }
    
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
                        width: 55,
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="Goal"
                    defaultValue={goalValue}
                    onChange={onChangeGoal}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: 55,
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="Assist"
                    defaultValue={assistValue}
                    onChange={onChangeAssist}
                    />
                    <TextField
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 0.6,
                        width: 55,
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
                        width: 55,
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
                        width: 55,
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
                        width: 55,
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
                        width: 55,
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
                        width: 55,
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
                        width: 55,
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
                        width: 55,
                        "& .MuiInputBase-root": {
                            height:30
                        }
                    }}
                    id="outlined-helperText"
                    label="Block"
                    defaultValue={blockValue}
                    />
                    <Button className="fantasy-button" variant="contained" onClick={() => onClick()}>Go</Button>
                </div>
                    <div className="fantasy-datagrid" style={{ flexGrow: 1 }}>
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
                            '& .super-app-theme--header': {
                                backgroundColor: 'rgba(14, 32, 161, 0.4)',
                                color: '#FFFFFF'
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
                                rowHeight={25}
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