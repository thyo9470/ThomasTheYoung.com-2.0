import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ArtThumbnail from '../Components/ArtThumbnail.js';
import './Art.css';
import artData from './artRegistry.json';

export default class Art extends Component {

  getArtThumbnails() {
    const thumbnails = [];
    artData.art.forEach((artEntry) => {
      const imageUrls = [...Array(artEntry.count).keys()].map(x => `/${artEntry.loc}/image${x}.jpg`);
      thumbnails.push(<ArtThumbnail imageUrls={imageUrls} key={artEntry.name}/>);
    });
    return thumbnails;
  }

  render() {
    return (
      <Grid id="artGrid" verticalAlign='middle'>
        <Grid.Column textAlign="center">
          {this.getArtThumbnails()}
          <div>
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}
