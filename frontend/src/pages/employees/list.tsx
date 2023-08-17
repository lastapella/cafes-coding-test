
import { useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom'
import { Button, Container, Grid, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const ActionColRenderer = (params) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = params.data

  return <div>
    <Button color="error" variant="outlined" onClick={() => dispatch({ type: 'deleteEmployee', payload: id })}>Delete</Button>
    <Button color="primary" variant="outlined" onClick={() => navigate(`/employee/edit?id=${id}`)}>Edit</Button>
  </div>
}

const EmployeesList = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()

  const cafe = queryParams.get('cafe')

  const employees = useAppSelector(state => state.employees)


  const fetchEmployees = (cafe?: string | null) => {
    if (cafe && cafe.length > 0) {
      dispatch({ type: "fetchEmployeesCafes", payload: cafe })
    } else {
      dispatch({ type: "fetchAllEmployees" })
    }
  }


  const [columnDefs] = useState([
    { field: 'name' },
    {
      field: 'email_address',
    },
    { headerName: 'Phone', field: 'phone_number' },
    {
      headerName: 'Gender', field: 'gender'
    },
    {
      headerName: 'Cafe', field: 'cafe_name'
    },
    { field: 'actions', cellRenderer: ActionColRenderer }
  ]);

  const onGridReady = useCallback((params) => {
    fetchEmployees(cafe)
  }, []);


  return <Grid container spacing={2}>
    <Grid container item xs={12}>
      <Grid item xs={12} sm={8}>
        <Typography variant="h4">Employees</Typography>
      </Grid>
      <Grid container item xs={12} sm={4} direction="row" justifyContent="flex-end">
        <Button style={{ marginLeft: 'auto' }} variant="contained" onClick={() => navigate(`/employee/new`)} >Add New Employee</Button>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <div className="ag-theme-alpine" >
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          domLayout='autoHeight'
          onGridReady={onGridReady}
        >
        </AgGridReact>
      </div>
    </Grid>
  </Grid>
}

export default EmployeesList
