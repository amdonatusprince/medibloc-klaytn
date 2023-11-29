import React from 'react'
import './aboutus.css'
import About_us from '../../assets/aboutus.png'


const Aboutus = () => {
  return (
    <div className="aboutus">
        <hr />
        <div className="medisync__aboutus">
            <div className="medisync__aboutus_text">
                <h1>ABOUT US</h1>
                <p>
                    MediSync is a heathFi protocol that allows users to carry out several medical related activities and get rewarded for impacting the community.
                    
                </p>
                
                <p>
                   - Users can securely store and sync their medical records.  <br/>
                   - Users decide who has access to their personal information. <br/>
                   - Users can also donate blood globally to save a life and then get rewaded with token incentives and SAVE A LIFE NFT badge to community contributors.
                </p>

                <p>
                MediSync incentives can be redeem in real life to purchase medications and subsidized healthcare  with our healthcare partners globally.
                </p>
            </div>

            <div className="medisync__aboutus_image">
                <img src={About_us} alt="Doctor" />
            </div>
        </div>
    </div>
  )
}

export default Aboutus