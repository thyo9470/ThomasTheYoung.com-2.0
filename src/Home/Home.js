import React from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import SocialIcons from '../Components/SocialIcons.js';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Grid verticalAlign='middle'>
      <Grid.Column textAlign="center" className='middleContainer'>
        <Container text> <p className="title"> Thomas Young </p> </Container>
        <Button color='black' onClick={() => navigate('/art')}>Art</Button>
        <Button color='black' onClick={() => navigate('/about_me')}>About Me</Button>
        <Container>
          <SocialIcons />
        </Container>
      </Grid.Column>
    </Grid>
  )
};

export default Home;
