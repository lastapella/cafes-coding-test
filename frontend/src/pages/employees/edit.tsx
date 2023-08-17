import { useEffect, useState } from 'react'

import { Button, Container, InputLabel, Grid, TextField, FormControl, Select, MenuItem } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useSearchParams } from 'react-router-dom';

const EditEmployee = ({ mode }: { mode: 'edit' | 'new' }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const employeeId = searchParams.get('id')
  const employee = useAppSelector(state => state.employees.find(employee => employee.id === employeeId))
  const cafes = useAppSelector(state => state.cafes)

  const [name, setName] = useState(employee?.name || '')
  const [email_address, setEmailAddress] = useState(employee?.email_address || '')
  const [phone_number, setPhoneNumber] = useState(employee?.phone_number || '')
  const [gender, setGender] = useState(employee?.gender || '')
  const [cafe_id, setCafeId] = useState(employee?.cafe_id || '')
  const [cafe_name, setCafeName] = useState(employee?.cafe_name || '')

  const handleSubmit = () => {
    if (mode === 'new') {
      dispatch({ type: 'createEmployee', payload: { name, email_address, phone_number, gender, cafe_id } })
    } else {
      dispatch({ type: 'updateEmployee', payload: { name, email_address, phone_number, gender, cafe_id } })
    }
  }

  useEffect(() => {
    dispatch({ type: 'fetchAllCafe' })
  }, [])


  return <Container >
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id="outlined-basic" label="Email" variant="outlined" value={email_address} onChange={e => setEmailAddress(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id="outlined-basic" label="Phone number" variant="outlined" value={phone_number} onChange={e => setPhoneNumber(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel >Cafe</InputLabel>
            <Select
              value={cafe_id}
              label="Cafe"
              onChange={(e) => setCafeId(e.target.value)}
            > {
                cafes.map((cafe) => {
                  return <MenuItem value={cafe.id}>{cafe.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel >Gender</InputLabel>
            <Select
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={'F'}>Female</MenuItem>
              <MenuItem value={'M'}>Male</MenuItem>
              <MenuItem value={''}>Prefer not to disclose</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>{mode === 'new' ? 'Create' : 'Edit'}</Button>
      </Grid>
    </form>
  </Container>

}


export default EditEmployee;
