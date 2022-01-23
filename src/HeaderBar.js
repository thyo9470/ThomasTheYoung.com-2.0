import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HeaderBar.css'

const locationNames = new Map();
locationNames.set('HOME', 'home');
locationNames.set('ART', 'art');
locationNames.set('ABOUT_ME', 'about_me');

const MenuExampleBasic = () => {
  const [activeItem, setActiveItem] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.log(location);
    locationNames.forEach(name => location.pathname.includes(name) && setActiveItem(name));
  }, [location]);

  const handleItemClick = (e, { name }) => {
    setActiveItem( name );
    navigate(name); 
  }

  return (
    <Menu>
      <Menu.Item
        name={locationNames.get('HOME')}
        active={activeItem === locationNames.get('HOME')}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>

      <Menu.Item
        name={locationNames.get('ART')}
        active={activeItem === locationNames.get('ART')}
        onClick={handleItemClick}
      >
        Art
      </Menu.Item>

      <Menu.Item
        name={locationNames.get('ABOUT_ME')}
        active={activeItem === locationNames.get('ABOUT_ME')}
        onClick={handleItemClick}
      >
        About Me
      </Menu.Item>
    </Menu>
  )
}

export default MenuExampleBasic;
