import React, { useState } from 'react';
import { useContractRead, useAccount } from 'wagmi';
import contractABI from './contractABI.json';
import no_records from '../images/no_record.png';
import '../css/getPatientRecord.css';

const GetDisability = () => {
  const { address } = useAccount();
  const [diagnosisDate, setDiagnosisDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [medication, setMedication] = useState(null);
  const [disability, setDisability] = useState(null);

  const contractAddress = '0xBFE9cF37fEC4455cfcbd8F74417e67D8b487d331';
  const contractAbi = contractABI;

  const { data: disabilityRecord, isLoading: disabilityLoading, isError: disabilityError } = useContractRead ({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getDisabilities',
    args: [address],
  });

 
 
    const getDisability = () => {
      try {
        if ( !disabilityLoading && !disabilityError && disabilityRecord) {
          setDisability(disabilityRecord);
        }
      } catch (error) {
        console.error('Error fetching allergy data:', error);
      }
  };

  // console.log('record', disability)
  return (
    <div className="my_record_disability">
      <h3>Disabilities</h3>
      <div className="disabilities_card">
      <img src={no_records} alt="" />
        {disability ? (
            disability.map(data => (
            <div className="disabilities_card" key={data._diabilityName}>
              <p>Allergy Name: {data.name}</p>
              <p>Description: {data.description}</p>
              <p>Diagnosis Date: {data.diagnosisDate}</p>
              <p>Medication: {data.medication}</p>
            </div>
          ))
        ) : (
          <>
            
            <p>No Record Yet</p>
          </>
        )}
      </div>
      <div className="get-disability-btn">
          <button onClick={getDisability}>Get Disability</button>
      </div>
    </div>
  );
};

export default GetDisability;
