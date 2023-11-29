// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MediBloc is Ownable{

   address i_owner;
  
   struct Allergy {
       string name;
       string description;
       string startDate;
       string medication;
   }

   struct Disability {
       string name;
       string description;
       string diagnosisDate;
       string medication;
   }

   struct PatientStats {
       string bloodGroup;
       string genotype;
       uint256 weight;
   }

   struct Diagnosis {
       string name;
       string diagnosisDate;
       string description;
       string medication;
   }

   mapping(address => Allergy[]) private allergies;
   mapping(address => Disability[]) private disabilities;
   mapping(address => PatientStats) private patientStats;
   mapping(address => Diagnosis[]) private diagnoses;
   mapping(address => mapping(address => bool)) private accessRights;

   constructor() Ownable(msg.sender){
       i_owner = msg.sender;
   }

   function getAllergies(address _user) public view returns (Allergy[] memory) {
       return allergies[_user];
   }

    function getDisabilities(address _user) public view returns (Disability[] memory) {
        return disabilities[_user];
    }

    function getPatientStats(address _user) public view returns (PatientStats memory) {
        return patientStats[_user];
    }

    function getDiagnoses(address _user) public view returns (Diagnosis[] memory) {
        return diagnoses[_user];
    }

    function addAnyAllergy(address _user, string memory _name, string memory _description, string memory _startDate, string memory _medication) public {
        allergies[_user].push(Allergy(_name, _description, _startDate, _medication));
    }

    function addAnyDisability(address _user, string memory _name, string memory _description, string memory _diagnosisDate, string memory _medication) public {
        disabilities[_user].push(Disability(_name, _description, _diagnosisDate, _medication));
    }

    function updatePatientStats(address _user, string memory _bloodGroup, string memory _genotype, uint256 _weight) public {
        patientStats[_user] = PatientStats(_bloodGroup, _genotype, _weight);
    }

    function addDiagnosis(address _user, string memory _name, string memory _diagnosisDate, string memory _description, string memory _medication) public {
        diagnoses[_user].push(Diagnosis(_name, _diagnosisDate, _description, _medication));
    }

   function viewInfo(address _viewer, address _viewed) public onlyOwner {
       accessRights[_viewer][_viewed] = true;
   }

   function revokeViewInfo(address _viewer, address _viewed) public onlyOwner {
       accessRights[_viewer][_viewed] = false;
   }
}