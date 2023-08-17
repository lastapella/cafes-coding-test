import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux';
import { Grid } from '@mui/material';

import { store } from './store'
import Routes from './Routes.tsx'
import Navigation from './layout/navigation';
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Navigation />
          </Grid>
          <Grid item xs={12}>
            <Routes />
          </Grid>
        </Grid>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
)
