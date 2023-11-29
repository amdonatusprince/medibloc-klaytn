import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
import contractABI from './contractABI.json';

const AllergyModal = (props) => {
  const { address } = useAccount();
  const [allergyDetails, setAllergyDetails] = useState({
    allergyName: '',
    description: '',
    startDate: '',
    medication: '',
  });

  const contractAddress = '0x8084B71fd847053621f36a3A87DDC885f45A467D';
  const contractAbi = contractABI;
  const { config: prepareConfig, loading: prepareLoading } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'addAnyAllergy',
    args: [
      address,
      allergyDetails.allergyName,
      allergyDetails.description,
      allergyDetails.startDate,
      allergyDetails.medication,
    ],
  });

  const { data: contractData, isLoading: contractLoading, isSuccess: contractSuccess, write: contractWrite } =
    useContractWrite(prepareConfig);

  const handleInputChange = (e) => {
    setAllergyDetails({
      ...allergyDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addAllergy = async () => {
    try {
      await contractWrite();
      setAllergyDetails({
        allergyName: '',
        description: '',
        startDate: '',
        medication: '',
      });
      // alert('Allergy added successfully!');
      props.onClose();
    } catch (error) {
      console.error('Error adding allergy:', error);
      // alert('Error adding allergy. Please try again.');
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal allergy_modal" onClick={props.onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_title">
          <h2>Add Allergy</h2>
        </div>
        <div className="modal_body">
          <h4>Allergy Name</h4>
          <input
            type="text"
            name="allergyName"
            value={allergyDetails.allergyName}
            onChange={handleInputChange}
            placeholder="Enter Allergy Name"
          />
          <h4>Description</h4>
          <input
            type="text"
            name="description"
            value={allergyDetails.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <h4>Start Date</h4>
          <input
            type="date"
            name="startDate"
            value={allergyDetails.startDate}
            onChange={handleInputChange}
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="YYYY-MM-DD"
          />
          <h4>Medication</h4>
          <input
            type="text"
            name="medication"
            value={allergyDetails.medication}
            onChange={handleInputChange}
            placeholder="Put in the meds"
          />
        </div>
        <div className="modal_footer">
          {contractLoading || prepareLoading ? (
            <ClipLoader color="#113355" loading={contractLoading || prepareLoading} />
          ) : (
            <>
              <button onClick={addAllergy}>Add</button>
              <button onClick={props.onClose} className="close_button">
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllergyModal;
