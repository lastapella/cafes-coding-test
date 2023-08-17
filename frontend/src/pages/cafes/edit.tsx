import { useState } from 'react'

import { Button, Container, Input, Grid, TextField, FormControl } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useSearchParams } from 'react-router-dom';

const EditCafe = ({ mode }: { mode: 'edit' | 'new' }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const cafeId = searchParams.get('id')
  const cafe = useAppSelector(state => state.cafes.find(cafe => cafe.id === cafeId))

  const [name, setName] = useState(cafe?.name || '')
  const [location, setLocation] = useState(cafe?.location || '')
  const [description, setDescription] = useState(cafe?.description || '')
  const [logo, setLogo] = useState(cafe?.logo || '')



  const handleSubmit = () => {
    console.log({ name, location, description, logo })
    if (mode === 'new') {
      dispatch({ type: 'createCafe', payload: { name, location, description, logo } })
    } else {
      dispatch({ type: 'updateCafe', payload: { id: cafeId, name, location, description, logo } })
    }
  }

  return <Container > <FormControl> <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField id="outlined-basic" label="Location" variant="outlined" value={location} onChange={e => setLocation(e.target.value)} />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={e => setDescription(e.target.value)} />
    </Grid>
    <Grid item xs={12} md={6}>
      <Input type="file" />
    </Grid>
  </Grid>
    <Grid item xs={12}>
      <Button type="submit" variant="contained" onClick={handleSubmit}>{mode === 'new' ? 'Create' : 'Edit'}</Button>
    </Grid>
  </FormControl>
  </Container>

}


export default EditCafe;
