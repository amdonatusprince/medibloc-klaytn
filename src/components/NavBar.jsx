import React from "react";
import store from "../store/Index";
import { useSnapshot } from "valtio";
import { useAccount } from 'wagmi'

function formatAddress(address) {
  if (typeof address !== 'string' || address.length < 7) {
      // Ensure the address is a string and has at least 7 characters
      return "Invalid address";
  }

  // Extract the first three letters
  var firstThreeLetters = address.slice(0, 3);

  // Extract the last four ending letters
  var lastFourEndingLetters = address.slice(-4);

  // Combine the extracted parts
  var formattedAddress = `${firstThreeLetters}...${lastFourEndingLetters}`;

  return formattedAddress;
}


const NavBar = () => {
  const { address } = useAccount()
  const result = formatAddress(address)
  const snap = useSnapshot(store);
  const fullName = `Welcome ${result}`;

  return (
    <div className="nav_bar">
      <h2>{fullName}</h2>
    </div>
  );
};

export default NavBar;
