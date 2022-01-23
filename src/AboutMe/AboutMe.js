import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import './AboutMe.css'
import SocialIcons from '../Components/SocialIcons.js';

const aboutMeDivStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0)',
};

const AboutMe = () => {
  return (
    <Grid verticalAlign='middle'>
      <Grid.Column textAlign="center" style={aboutMeDivStyle}>
        <Container text > <p className="title"> Hello There! </p> </Container>
        <Container text > 
          <p className="text">My name is Thomas Young. I am a software engineer living in Seattle who likes to explore a diverse set of mediums in my free time. From drawing whimsical holiday cards and painting shoes, to building keyboards and exploring the world of 3D resin printing, I have always strived to expand my skill set and learn something new.</p> 
        </Container>
        <SocialIcons />          
      </Grid.Column>
    </Grid>
  )
};

export default AboutMe;
