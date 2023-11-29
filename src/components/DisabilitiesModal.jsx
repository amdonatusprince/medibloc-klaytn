import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import contractAbi from "./contractABI.json";

const contractAddress = "0xBFE9cF37fEC4455cfcbd8F74417e67D8b487d331";
const contractABI = contractAbi;

const DisabilitiesModal = (props) => {
  const { address } = useAccount();
  const [errorMessage, setErrorMessage] = useState("");
  const [disability, setDisability] = useState("");
  const [diagnosisDate, setDiagnosisDate] = useState("");
  const [description, setDescription] = useState("");
  const [medication, setMedication] = useState("");

  const { config: prepareConfig, loading: prepareLoading } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "addAnyDisability",
    args: [address, disability, description, diagnosisDate, medication],
  });

  const { data: contractData, isLoading: contractLoading, isSuccess: contractSuccess, write: contractWrite } =
    useContractWrite(prepareConfig);

  const handleAddDisability = async () => {
    try {
      await contractWrite();
      setDisability("");
      setDiagnosisDate("");
      setDescription("");
      setMedication("");
      props.onClose();
    } catch (error) {
      console.error("Error adding disability:", error);
      setErrorMessage("An error occurred while adding the disability. Please try again.");
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal disabilities_modal" onClick={props.onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_title">
          <h2>Add Disability</h2>
        </div>
        <div className="modal_body">
          <h4>Disability</h4>
          <input
            id="disabilityInput"
            type="text"
            placeholder="What is your disease state?"
            value={disability}
            onChange={(e) => setDisability(e.target.value)}
          />
          <h4>Diagnosis date</h4>
          <input
            id="diagnosisDateInput"
            type="date"
            placeholder="YYYY-MM-DD"
            value={diagnosisDate}
            onChange={(e) => setDiagnosisDate(e.target.value)}
          />
          <h4>Description</h4>
          <input
            id="descriptionInput"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h4>Medication</h4>
          <input
            id="medicationInput"
            type="text"
            placeholder="Add your meds"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          />
        </div>
        <div className="modal_footer">
          {contractLoading || prepareLoading ? (
            <ClipLoader color="#113355" loading={contractLoading || prepareLoading} />
          ) : (
            <>
              <button onClick={handleAddDisability}>Add</button>
              <button onClick={props.onClose} className="close_button">
                Close
              </button>
            </>
          )}
        </div>
        {contractSuccess && <p style={{ color: "green", marginTop: "10px" }}>Record added!</p>}
        {errorMessage && <p className="error_message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default DisabilitiesModal;
