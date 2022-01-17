import React, { Component } from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <Grid verticalAlign='middle'>
        <Grid.Column textAlign="center">
          <Container Text> <p> Thomas Young </p> </Container>
          <Button color='black'>Art</Button>
          <Button color='black'>Blog</Button>
          <Button color='black'>Contact Me</Button>
        </Grid.Column>
      </Grid>
    )
  }
}
