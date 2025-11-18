import { ethers } from "ethers";
import {
  LOCAL_CONTRACT_ADDRESS,
  SEPOLIA_CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "./constants/config";

let provider;
let signer;
let contract;

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const network = await provider.getNetwork();

  let contractAddress;

  if (network.chainId === 31337n) {
    contractAddress = LOCAL_CONTRACT_ADDRESS;
  } else if (network.chainId === 11155111n) {
    contractAddress = SEPOLIA_CONTRACT_ADDRESS;
  } else {
    throw new Error(
      "Unsupported network. Use Localhost 8545 or Sepolia."
    );
  }

  contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
  console.log("Connected to contract:", contractAddress);
  console.log("Signer:", await signer.getAddress());
  console.log("Network:", network.chainId);
  return signer.address;
};

export const registerVehicle = (did, ipfs) =>
  contract.registerVehicle(did, ipfs);

export const grantAccess = (did, driver, hash) =>
  contract.grantAccess(did, driver, hash);

export const revokeAccess = (did) =>
  contract.revokeAccess(did);

export const verifyAccess = (did, driver) =>
  contract.verifyAccess(did, driver);
