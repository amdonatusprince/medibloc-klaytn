import React, { useState } from "react";
import { useContractRead, useAccount } from 'wagmi';
import no_records from "../images/no_record.png";
import contractAbi from './contractABI.json';

const contractABI = contractAbi;
const contractAddress = '0xBFE9cF37fEC4455cfcbd8F74417e67D8b487d331';


const MyRecordOtherInformation = () => {
  const { address } = useAccount();
  const [otherInformation, setOtherInformation] = useState(null);

  const { data: result, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getDiagnoses',
    args: [address],
  });


  // console.log('record', result)

  const getOtherInformation = async () => {
    try {
      if (!isLoading && !isError && result) {
        setOtherInformation(result);
      }

    } catch (error) {
      console.error("Error fetching other information:", error);
      alert("Failed to fetch other information");
    }
  };


  return (
    <>
    <div className="my_record_other-information">
      <h3>Other Information</h3>
      <div className="disabilities_card">
        <img src={no_records} alt="" />
        {otherInformation ? (
            otherInformation.map(data => (
              <div className="disabilities_card" key={data._diabilityName}>
                <p>Title: {data.name}</p>
                <p>Description: {data.description}</p>
                <p>Diagnosis Date: {data.diagnosisDate}</p>
                <p>Medication: {data.medication}</p>
              </div>
            ))
          
        ) : (
          <p>No Record Yet</p>
        )}
      </div>
      <button onClick={getOtherInformation}>Fetch Other Information</button>
      </div>
    </>
  );
};

export default MyRecordOtherInformation;
