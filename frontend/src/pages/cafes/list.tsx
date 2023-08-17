import { useEffect, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { useNavigate, Link } from 'react-router-dom'
import { Button,  Grid, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const ActionColRenderer = (params) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = params.data

  return <div>
    <Button color="error" variant="outlined" onClick={() => dispatch({ type: 'deleteCafe', payload: id })}>Delete</Button>
    <Button color="primary" variant="outlined" onClick={() => navigate(`/cafe/edit?id=${id}`)}>Edit</Button>
  </div>
}

const LogoColRenderer = (params) => {
  const { logo } = params.data
  return <img src={logo} />
}

const EmployeeColRenderer = (params) => {
  const { employee_count, id } = params.data
  return <Link to={`/employees?cafe=${id}`} > {employee_count} </Link>
}

const CafesList = ({ location }: { location?: string }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const cafes = useAppSelector(state => state.cafes)


  const fetchCafes = (location?: string) => {
    if (location && location.length > 0) {
      dispatch({ type: "fetchCafeByLocation", payload: { location } })
    } else {
      dispatch({ type: "fetchAllCafe" })
    }
  }

  const [columnDefs] = useState([
    { field: 'logo', cellRenderer: LogoColRenderer },
    { field: 'name' },
    { field: 'description' },
    {
      field: 'location', filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Employees', field: 'employee_count', cellRenderer: EmployeeColRenderer
    },
    { field: 'actions', cellRenderer: ActionColRenderer }
  ]);
  
  const onGridReady = useCallback((params) => {
    fetchCafes(location)
  }, []);

  return <Grid container spacing={2}>
    <Grid container item xs={12}>
      <Grid item xs={12} sm={8}>
        <Typography variant="h4">Cafes</Typography>
      </Grid>
      <Grid container item xs={12} sm={4} direction="row" justifyContent="flex-end">
        <Button style={{ marginLeft: 'auto' }} variant="contained" onClick={() => navigate(`/cafe/new`)} >Add</Button>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <div className="ag-theme-alpine" >
        <AgGridReact
          rowData={cafes}
          columnDefs={columnDefs}
          domLayout='autoHeight'
          onGridReady={onGridReady}
        >
        </AgGridReact>
      </div>
    </Grid>
  </Grid>
}

export default CafesList
