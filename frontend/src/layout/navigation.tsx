import { Link } from 'react-router-dom';
import {Grid} from '@mui/material';


const Navigation = () => {
  return <Grid container spacing={2}>
    <Grid item>
      <Link to="/">Cafes</Link>
    </Grid>
    <Grid item>
      <Link to="/employees">Employees</Link>
    </Grid>
  </Grid>
}


export default Navigation;
