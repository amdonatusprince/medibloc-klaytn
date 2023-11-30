import { ethers } from 'ethers';
import React, { useState } from 'react';
import "../css/getPatientRecord.css"
import contractAbi from './contractABI.json';
import { useContractRead, useAccount } from 'wagmi';

const contractABI = contractAbi;
const contractAddress = '0xBFE9cF37fEC4455cfcbd8F74417e67D8b487d331';

const GetPatientRecord = () => {
  const { address } = useAccount();
  const [bloodGroup, setBloodGroup] = useState('');
  const [genotype, setGenotype] = useState('');
  const [weight, setWeight] = useState('');

  // Call the useContractRead hook directly inside the functional component
  const { data: records, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getPatientStats',
    args: [address],
  });
  // setBloodGroup(records[0]);
  // setGenotype(records[1]);
  // setWeight(records[2].toString());

  // console.log(records)

  const handleViewButtonClick = () => {
    try {
      // Check if data is available and not loading
      if (!isLoading && !isError && records) {
        setBloodGroup(records['bloodGroup']);
        setGenotype(records['genotype']);
        setWeight(records['weight'].toString());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="get-patient-record">
      <section>
        <h5>Blood Group</h5>
        <input type="text" value={bloodGroup} readOnly />
      </section>
      <section>
        <h5>Genotype</h5>
        <input type="text" value={genotype} readOnly />
      </section>
      <section>
        <h5>Weight (kg)</h5>
        <input type="text" value={weight} readOnly />
      </section>
      <button className="get-patient-record-btn" onClick={handleViewButtonClick}>
        View
      </button>
    </div>
  );
};

export default GetPatientRecord;
