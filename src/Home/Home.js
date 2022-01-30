import React from 'react';
import { Grid, Button, Container, Checkbox } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import SocialIcons from '../Components/SocialIcons.js';

const divStyle = {
  height: '100vh'
};

const Home = (props) => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);

  const updateChecked = (newCheckedState) => {
    setChecked(newCheckedState);
    props.setScrolling(newCheckedState);
  }

  return (
    <div style={divStyle}>
      <div className="scrollingToggle" >
        <Checkbox 
          slider 
          onChange={(e, data) => updateChecked(data.checked)}
          checked={checked}
        />
        <p className="text"> Parallax </p>
      </div>
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
    </div>
  )
};

export default Home;
