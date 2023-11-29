import React, { useState } from "react";
import { ethers } from "ethers";
import "../css/styles.css";
import contractAbi from "../components/contractABI.json";
import "../css/getPatientRecord.css"

const contractABI = contractAbi;
const contractAddress = '0x8084B71fd847053621f36a3A87DDC885f45A467D';

const GetAuthorizedAddresses = () => {

  return (
    <div className="medical-records main_container">
      <p>Enter Address you wish to grant permision to view your information!</p>
      <input></input>
      <button >Grant Access</button>
      
    </div>
  );
};

const App = () => {
  return (
    <div>
      {/* Other components */}
      <GetAuthorizedAddresses />
      {/* Other components */}
    </div>
  );
};

export default App;
