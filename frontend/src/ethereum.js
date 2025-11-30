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
  if (!window.ethereum) throw new Error("MetaMask not installed");

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  const network = await provider.getNetwork();

  let contractAddress =
    network.chainId === 31337n
      ? LOCAL_CONTRACT_ADDRESS
      : network.chainId === 11155111n
      ? SEPOLIA_CONTRACT_ADDRESS
      : null;

  if (!contractAddress) throw new Error("Unsupported network. Switch to Sepolia.");

  contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

  return signer.address;
};


export const registerVehicle = (did, ipfsHash) =>
  contract.registerVehicle(did, ipfsHash);

export const grantAccess = (did, driver, hash, expiresAt) =>
  contract.grantAccess(did, driver, hash, expiresAt);

export const revokeAccess = (did, driver) =>
  contract.revokeAccess(did, driver);

export const verifyAccess = (did, driver) =>
  contract.verifyAccess(did, driver);

export const transferOwnership = (did, newOwner) =>
  contract.transferOwnership(did, newOwner);

export const getVehicle = (did) =>
  contract.getVehicle(did);