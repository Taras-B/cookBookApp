import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container  from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export const Loader = () => {
  return (
    <Container>
      <Grid container justify='center'>
      <CircularProgress color="secondary"/>
      </Grid>
    </Container>
  )
}
