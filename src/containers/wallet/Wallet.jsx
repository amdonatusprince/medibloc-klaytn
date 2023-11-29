import React, { useState } from "react";
import "./wallet.css";
import newlogo from "../../assets/newlogo3.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import styled, { keyframes } from "styled-components";
import { Link } from 'react-router-dom'; // Import Link

const Wallet = () => {
  const { address, isConnected, isDisconnected } = useAccount();

  return (
    <div className="medisync__wallet_details">
      <img src={newlogo} alt="Logo"/>

      <div className="medisync__wallet_detail">
        <h2>
          To activate your account, Click the 
          button below to connect your Wallet
        </h2>

        {!isConnected && (
          <div className="medisync__wallet_details-button">
            <ConnectBtn>
              <ConnectButton />
            </ConnectBtn>
          </div>
        )}

        {isConnected && (
            <ConnectBtn>
          <ProceedLink to="/dashboard">
            Proceed to Dashboard
          </ProceedLink>
          </ConnectBtn>
        )}
      </div>
    </div>
  );
};

export default Wallet;

const ConnectBtn = styled.button`
  // (styles remain unchanged)
`;

const BtnLabel = styled.span`
  // (styles remain unchanged)
`;

const animateOpacity = keyframes`
  // (styles remain unchanged)
`;

const Loading = styled.span`
  // (styles remain unchanged)
`;

const ProceedLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  text-decoration: none;
  width: 350px !important;
  height: 50px;
  margin: 10px;
  font-size: 20px;
  padding: 0px 0px;
  font-weight: 500;
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
`;
