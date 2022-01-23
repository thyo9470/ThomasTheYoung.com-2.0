import React from 'react';
import { Icon } from 'semantic-ui-react';
import './SocialIcons.css';

const SocialIcons = () => {
  return (
    <div className="socialIcons">
      <a href="https://www.instagram.com/thomastheyoung/" target="_blank" rel="noreferrer"><Icon name='instagram' size='big'/></a>
      <a href="https://github.com/thyo9470" target="_blank" rel="noreferrer"><Icon name='github' size='big'/></a>
      <a href="https://www.linkedin.com/in/thomasy314" target="_blank" rel="noreferrer"><Icon name='linkedin' size='big'/></a>
      <a href="mailto: Thomas@ThomasTheYoung.com" target="_blank" rel="noreferrer"><Icon name='mail outline' size='big'/></a>
    </div>
  )
};

export default SocialIcons;
