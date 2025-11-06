# DriveID
# 🚗 DriveID — Decentralized Vehicle Identity and Access Management
**CSE540 – Draft Smart Contract Design | Group 14**

---

## 📜 Project Description
DriveID is a decentralized smart contract system designed to manage **vehicle identity, ownership, and access control** using blockchain technology.  
Traditional vehicle rental and ownership systems rely on centralized databases, which can lead to:
- Security and data privacy risks  
- Inefficient manual verification  
- Limited transparency  

DriveID eliminates these issues by using **Ethereum smart contracts** to store verifiable vehicle credentials and ownership details.  
Each vehicle and driver is registered on-chain with **Decentralized Identifiers (DIDs)** and **Verifiable Credentials (VCs)**, allowing transparent and tamper-proof access management.

---

## 🧱 Contract Overview
### **Contract Name:** `DriveID.sol`

#### Key Features:
- **Vehicle Registration:** Register vehicle DIDs and IPFS metadata hashes.  
- **Access Management:** Grant and revoke access credentials to authorized drivers.  
- **Verification:** Publicly verify whether a driver has valid access to a vehicle.  
- **Event Logging:** Emits immutable events (`VehicleRegistered`, `AccessGranted`, `AccessRevoked`) for transparency.

---

## ⚙️ Dependencies / Setup Instructions

### **Requirements**
- Node.js ≥ 18  
- Hardhat 2.27.0  
- OpenZeppelin Contracts 5.4.0  
- dotenv 17.2.3  

### **Installation**
```bash
npm install
