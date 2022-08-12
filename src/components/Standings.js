import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

  const columns = [
    { field: 'maths', headerName: 'Maths', width: 130 },
    { field: 'science', headerName: 'Science', width: 130 }
  ];

  const rows = [
    { id: 1, maths: 75, science: 60 },
    { id: 2, maths: 80, science: 70 },
    { id: 3, maths: 50, science: 80 },
    { id: 4, maths: 80, science: 60 },
    { id: 5, maths: 100, science: 90 },
    ];



const Standings = () => {

  return (
    <div className='standings-container'>
        <div style={{ height: '80vh', width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
        </div>
        </div>
    </div>
  )
}

export default Standings