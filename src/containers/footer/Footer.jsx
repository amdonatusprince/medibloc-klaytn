import React from 'react';
import './footer.css';

import Logo from '../../assets/medisync-logo.png';

const Footer = () => {
  return (
    <div className="medisync__footer">
      <div className="medisync__footer_sections">
        <div className="medisync__footer_sections_contact">
          <div className="medisync__footer_sections_contact-logo">
            <img src={Logo} alt="logo" />
          </div>

        </div>

        <div className="medisync__footer_sections_section">

<div className="medisync__footer-copyright">Copyright @2023 MediSync</div>
        </div>

      </div>

      
    </div>
  )
}

export default Footer