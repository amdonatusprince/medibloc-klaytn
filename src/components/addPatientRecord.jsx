import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import '../css/AddPatientRecord.css';
import contractAbi from './contractABI.json';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';

const AddPatientRecord = () => {
  const { address } = useAccount();
  const [successMessage, setSuccessMessage] = useState(null);
  const [bloodGroup, setBloodGroup] = useState('');
  const [genotype, setGenotype] = useState('');
  const [weight, setWeight] = useState('');
0xBFE9cF37fEC4455cfcbd8F74417e67D8b487d331
  const { config } = usePrepareContractWrite({
    address: '0xBFE9cF37fEC4455cfcbd8F74417e67D8b487d331',
    abi: contractAbi,
    functionName: 'updatePatientStats',
    args: [address, bloodGroup, genotype, weight],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleAddRecord = async () => {
    try {
      await write(); // Call the write function
      // Display success message in green
      setSuccessMessage('Record added!');
    } catch (error) {
      // Handle error if the transaction fails
      console.error('Error adding record:', error);
    }
  };

  return (
    <div className="info-section">
      <section>
        <div className="patient-details-section">
          <h3>Blood Group</h3>
          <form action="">
            <select id="bloodGroup" name="" onChange={(e) => setBloodGroup(e.target.value)}>
              <option value="">None</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </form>
        </div>
      </section>
      <section>
        <div className="patient-details-section">
          <h3>Genotype</h3>
          <form action="">
            <select id="genotype" name="" onChange={(e) => setGenotype(e.target.value)}>
              <option value="">None</option>
              <option value="AA">AA</option>
              <option value="AC">AC</option>
              <option value="AS">AS</option>
              <option value="CC">CC</option>
              <option value="SC">SC</option>
              <option value="SS">SS</option>
            </select>
          </form>
        </div>
      </section>
      <section>
        <div className="patient-details-section">
          <h3>Weight (kg)</h3>
          <input id="weight" type="text" placeholder="0" onChange={(e) => setWeight(e.target.value)} />
        </div>
      </section>

      {isLoading && (
        <div className="add-button">
          <ClipLoader color="#113355" loading={isLoading} />
        </div>
      )}

      {isSuccess && !isLoading && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          {successMessage}
        </div>
      )}

      {!isLoading && !isSuccess && (
        <button id="addButton" className="add-button" onClick={handleAddRecord}>
          Add Patient Record
        </button>
      )}
    </div>
  );
};

export default AddPatientRecord;
