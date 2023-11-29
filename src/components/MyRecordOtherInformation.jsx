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


  const getOtherInformation = async () => {
    try {
      if (!isLoading && !isError && records) {
        setOtherInformation({
          _title: result[0],
          _diagnosedDate: result[1],
          _disease: result[2],
          _description: result[3],
          _medication: result[4]
        });
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
          <>
            <p>Title: {otherInformation._title}</p>
            <p>Diagnosed Date: {new Date(otherInformation._diagnosedDate).toLocaleString()}</p>
            <p>Disease: {otherInformation._disease}</p>
            <p>Description: {otherInformation._description}</p>
            <p>Medication: {otherInformation._medication}</p>
          </>
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
