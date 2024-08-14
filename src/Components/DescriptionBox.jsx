import React from 'react';
import './DescriptionBox.css';

const Description = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
          <div className="descriptionbox-nav-box">
            Description
          </div>
          <div className="descriptionbox-nav-box fade">
            Reviews
          </div>
        </div>
        <div className="descriptionbox-description">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam sint, voluptates, maxime suscipit sunt expedita eius porro assumenda, distinctio nisi saepe impedit in enim rerum eum nostrum quia neque consequuntur?</p>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente suscipit officia quasi asperiores, dolorem dolore distinctio ex architecto corporis laudantium est tempora alias porro, dignissimos aliquid mollitia sit nam corrupti!
        </p>
        </div>       
    </div>
  )
}

export default Description