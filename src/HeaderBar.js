import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class MenuExampleBasic extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name='art'
          active={activeItem === 'art'}
          onClick={this.handleItemClick}
        >
          Art
        </Menu.Item>

        <Menu.Item
          name='blog'
          active={activeItem === 'blog'}
          onClick={this.handleItemClick}
        >
          Blog
        </Menu.Item>

        <Menu.Item
          name='contactMe'
          active={activeItem === 'contactMe'}
          onClick={this.handleItemClick}
        >
          Contact Me
        </Menu.Item>
      </Menu>
    )
  }
}
