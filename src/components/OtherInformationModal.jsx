import React, { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
import ClipLoader from "react-spinners/ClipLoader";
import contractABI from "./contractABI.json";

const AddOtherInformation = (props) => {
  const [title, setTitle] = useState("");
  const [diagnosedDate, setDiagnosedDate] = useState("");
  const [disease, setDisease] = useState("");
  const [description, setDescription] = useState("");
  const [medication, setMedication] = useState("");

  const contractAddress = "0xBFE9cF37fEC4455cfcbd8F74417e67D8b487d331";
  const contractAbi = contractABI;
  const { address } = useAccount();

  const { config, loading, write } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'addDiagnosis',
    args: [
      address,
      disease,
      diagnosedDate,
      description,
      medication
    ],
  });

  const { isLoading, isSuccess } = useContractWrite(config);

  const addOtherInformation = async () => {
    try {
      await write();
      setTitle("");
      setDiagnosedDate("");
      setDisease("");
      setDescription("");
      setMedication("");
      props.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal other-information_modal" onClick={props.onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_title">
          <h2>Any other Disease state?</h2>
        </div>
        <div className="modal_body">
          <h4>Title of</h4>
          <input
            type="text"
            placeholder="What kind of sickness?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h4>Diagnosed date</h4>
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            value={diagnosedDate}
            onChange={(e) => setDiagnosedDate(e.target.value)}
          />
          <h4>Disease</h4>
          <input
            type="text"
            placeholder="Name of sickness?"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
          <h4>Description</h4>
          <input
            type="text"
            placeholder="Nature of sickness?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h4>Medication</h4>
          <input
            type="text"
            placeholder="What medications do you take?"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          />
        </div>
        <div className="modal_footer">
          {loading || isLoading ? (
            <ClipLoader color="#113355" loading={loading || isLoading} />
          ) : (
            <>
              <button onClick={addOtherInformation}>Add</button>
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

export default AddOtherInformation;
