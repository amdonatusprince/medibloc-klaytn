import React from 'react';
import './ourservices.css';
import Services1 from '../../assets/medical_record1.png'
import Services2 from '../../assets/donate_blood.png'
import Services3 from '../../assets/healthcare1.png'

const Services = () => {
  return (
    <div className="medisync__ourservices">
      <hr /><h1>WHAT WE OFFER</h1>
      <div className="medisync__ourservices_tabs">
        <div className="medisync__ourservices_tabs-tab">
          <div className="medisync__ourservices_tabs-tab-image">
            <img src={Services1} alt="Services" />
          </div>
          <h2>Secure Medical Record</h2>
          <p>
            Medisync  offers full privacy to users by allowing them to be in total control of their data.
            They can choose to grant and revoke access to third parties.
          </p>
        </div>

        <div className="medisync__ourservices_tabs-tab">
          <div className="medisync__ourservices_tabs-tab-image">
            <img src={Services2} alt="Services" />
          </div>
          <h2>Token and NFT Incentives</h2>
          <p>
            Medisync offers users rewards which can be 
            redeemed in real life to purchase medications, 
            schedule doctor's appointement.
          </p>
        </div>

        <div className="medisync__ourservices_tabs-tab">
          <div className="medisync__ourservices_tabs-tab-image">
            <img src={Services3} alt="Services" />
          </div>
          <h2>Subsizized Healthcare</h2>
          <p>
            Medisync issues a "SAVE A LIFE" NFT badge to users who contribute to the society
            by donating blood to save a life which can be redemmed to access subsidized healthcare
            globally.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Services