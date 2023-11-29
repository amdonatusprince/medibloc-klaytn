import React, { useState } from 'react';
import { useContractRead, useAccount } from 'wagmi';
import contractABI from './contractABI.json';
import no_records from '../images/no_record.png';
import '../css/getPatientRecord.css';

const GetDisability = () => {
  const { address } = useAccount();
  const [disability, setDisability] = useState(null);
  const [diagnosisDate, setDiagnosisDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [medication, setMedication] = useState(null);

  const contractAddress = '0x8084B71fd847053621f36a3A87DDC885f45A467D';
  const contractAbi = contractABI;

  const { data: disabilityRecord, isLoading: disabilityLoading, isError: disabilityError } = useContractRead ({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getDisabilities',
    args: [address],
  });


  const handleClick = () => {
    try {
      // Check if data is available and not loading
      if (!disabilityLoading && !disabilityError && disabilityData) {
        const [disability, diagnosisDate, description, medication] = disabilityData;
        setDisability(disability);
        setDiagnosisDate(diagnosisDate.toNumber());
        setDescription(description);
        setMedication(medication);
      }
    } catch (error) {
      console.error('Error retrieving disability:', error);
    }
  };

  return (
    <div className="my_record_disability">
      <h3>Disabilities</h3>
      <div className="disabilities_card">
        {disability ? (
          <>
            <img src={disability.image} alt="" />
            <p>Disability: {description}</p>
            <p>Diagnosis Date: {diagnosisDate}</p>
            <p>Medication: {medication}</p>
          </>
        ) : (
          <>
            <img src={no_records} alt="" />
            <p>No Record Yet</p>
          </>
        )}
      </div>
      <div className="get-disability-btn">
          <button onClick={handleClick}>Get Disability</button>
      </div>
    </div>
  );
};

export default GetDisability;
