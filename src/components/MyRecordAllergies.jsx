import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useContractRead, useAccount } from 'wagmi';
import contractABI from './contractABI.json';
import noRecordsImage from '../images/no_record.png';
import '../css/getPatientRecord.css';

const MyRecordAllergies = () => {
  const { address } = useAccount();
  const [allergies, setAllergies] = useState(null);

  const contractAddress = '0xBFE9cF37fEC4455cfcbd8F74417e67D8b487d331';
  const contractAbi = contractABI;


  const { data: allergiesData, isLoading: allergyLoading, isError: allergyError } = useContractRead ({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAllergies',
    args: [address],
  });


  const getAllergy = () => {
    try {
      if (!allergyLoading && !allergyError && allergiesData) {
        setAllergies(allergiesData);
      }
    } catch (error) {
      console.error('Error fetching allergy data:', error);
    }
  };

  return (
    <div className="my_record_allergy">
      <h3>Allergies</h3>
      {allergies ? (
        allergies.map(allergy => (
          <div className="disabilities_card" key={allergy._allergyName}>
            <p>Allergy Name: {allergy.allergyName}</p>
            <p>Description: {allergy.description}</p>
            <p>Start Date: {allergy.startDate}</p>
            <p>Medication: {allergy.medication}</p>
          </div>
        ))
      ) : (
        <div className="disabilities_card">
          <img src={noRecordsImage} alt="" />
          <p>No Record Yet</p>
        </div>
      )}
      <div className="get-allergies-btn">
          <button onClick={getAllergy}>Get Allergies</button>
      </div>
    </div>
  );
};

export default MyRecordAllergies;
