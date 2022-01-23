import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Carousel from '../Components/Carousel.js';
import './ArtThumbnail.css'

export default class ArtThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <Modal
        basic
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        trigger={<img alt="thumbnail" className="artThumbnail" src={require('../../public' + this.props.imageUrls[0]).default}/>}
        dimmer="blurring"
      >
        <Modal.Content>
          <Carousel imageUrls={this.props.imageUrls.slice(1)}/> 
        </Modal.Content>
      </Modal>
    )
  }
}

ArtThumbnail.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string)
};
