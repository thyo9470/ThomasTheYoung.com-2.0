import React, { Component } from 'react';
import { Grid, Button, Icon, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './Carousel.css'

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curImgIndex: 0
    }
  }

  // TODO: Fix alt text
  render() {
    return (
      <Grid verticalAlign='middle'>
        <Grid.Column textAlign="center">
          <Container id="testingSomething"> <img id="carouselImage" alt="Some Cool Stuff" src={process.env.PUBLIC_URL + this.getCurrentImage()} /> </Container>
          <Button icon labelPosition='left' onClick={this.prevImage}>
            <Icon name='left arrow' />
            Prev
          </Button>
          <Button icon labelPosition='right' onClick={this.nextImage}>
            <Icon name='right arrow' />
            Next
          </Button>
        </Grid.Column>
      </Grid>
    )
  }

  getCurrentImage() {
    return this.props.imageUrls[this.state.curImgIndex];
  }

  nextImage = () => {
    this.setState((state) => {
      return { curImgIndex: (state.curImgIndex + 1) % this.props.imageUrls.length}
    });
  }

  prevImage = () => {
    this.setState((state) => {
      return { curImgIndex: state.curImgIndex - 1 < 0 ? this.props.imageUrls.length - 1 : state.curImgIndex - 1}
    });
  }

}

Carousel.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string)
};
