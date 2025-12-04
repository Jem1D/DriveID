# DriveID: Decentralized Vehicle Identity and Access Management
**CSE540 – Draft Smart Contract Design**

_by **Group 14**_


## Project Overview
DriveID is a decentralized platform based on a smart contract system that enables managing **car identity, ownership, and access** through blockchain technology.

### Motivation
Traditional car rental and ownership practices involve a centralized database, and this brings about problems such as:
- Risks of Security and Data Protection  
- Inefficient manual verification 
- Limited Transparency  
 
DriveID solves this problem by utilizing **Ethereum Smart Contracts** for storing verified car information and ownership proof on its platform.
Every car and its respective driver has a record on a blockchain via **Decentralized Identifiers (DIDs)** and **Verifiable Credentials (VCs)**.

DriveID provides a self-governing identification layer where:
* **Owners** manage credentials without intermediaries[cite: 14, 15].
* **Verifiers** can independently confirm access legality on-chain[cite: 16].
* **Drivers** utilize Verifiable Credentials (VCs) linked to Decentralized Identifiers (DIDs)[cite: 10].

  
## Key Features

* **Immutable Vehicle Registration:** Register vehicles with unique DIDs and link metadata via IPFS.
* **Dynamic Access Control:** Grant access to specific drivers with precise expiration timestamps (calculated in seconds).
* **Revocation:** Instantly revoke a driver's access privileges before the expiration time.
* **Ownership Transfer:** Securely transfer vehicle administrative rights to a new wallet address.
* **Metadata Management:** Update off-chain IPFS links for vehicle data without changing the DID.
* **Public Verification:** Verifiers can instantly check if a driver has valid, unexpired, and unrevoked access.
* **Owner Lookup:** Publicly resolve a Vehicle DID to its current Ethereum owner address.
* **Efficient On-Chain Storage:** Vehicles and credentials are stored as simple structs and mappings keyed by hashed DIDs for **O(1) lookups** and low gas usage.
* **Immutable Audit Trail:** Every important change (registration, access grants/revocations, transfers) emits events, creating a permanent audit log for verifiers and regulators.


## Contract Overview
### **Contract Name:** `DriveID.sol`
(Ownable; emits transparent events; maintains  hashes / pointers of credentials on-chain; metadata on IPFS.)

#### Core Functions:
* `registerVehicle(vehicleDID, ipfsHash)`: Onboards a new vehicle.
* `updateVehicleMetadata(vehicleDID, newIpfsHash)`: Updates the IPFS metadata for an already-registered vehicle.
* `grantAccess(vehicleDID, driver, credentialHash, expiresAt)`: Issues a time-bound credential for a driver.
* `revokeAccess(vehicleDID, driver)`: Invalidates a driver's specific credential.
* `transferOwnership(vehicleDID, newOwner)`: Transfers administrative rights to another wallet.
* `verifyAccess(vehicleDID, driver)`: Returns `isValid`, `expiresAt`, and `credentialHash` so any third party can check access on-chain.
* `getVehicle(vehicleDID)`: Returns full vehicle details and owner address.
* `getCredential(vehicleDID, driver)`: Returns the full `Credential` struct for a given driver and vehicle.

### Events
* `VehicleRegistered`
* `VehicleMetadataUpdated`
* `OwnershipTransferred`
* `AccessGranted`
* `AccessRevoked`


## Dependencies / Setup Instructions

### **Requirements**
- Node.js ≥ 18  
- MetaMask Wallet Extension

## Technology Stack
* **Blockchain:** Ethereum (Local Hardhat Network / Sepolia)
* **Smart Contracts:** Solidity `^0.8.20`, OpenZeppelin
* **Frontend:** React.js, Ethers.js, CSS (Dark Mode Interface)
* **Storage:** IPFS (for off-chain metadata)
* **Testing:** Hardhat, Mocha/Chai

### **Installations**
```bash
npm install
```
### **Contract setup steps**
```bash
# 1. Compile the contract
npx hardhat compile

# 2. Start a local Ethereum node
npx hardhat node

# 3. Deploy contract on localhost
npx hardhat run scripts/deploy.js --network localhost

# 4. Open contract console on localhost
npx hardhat console --network localhost

# 5. Deploy contract on pubic network using Sepolia Ethers
npx hardhat run scripts/deploy.js --network sepolia

```
### **Launch Frontend**
```bash
npm run dev
```
Open http://localhost:5173 to view the DriveID Dashboard.


## Results: DriveID Dashboard

* **Single-Page Experience:**  
  The dashboard groups registration, access control, and verification flows into a single page so owners and drivers don’t have to jump between multiple screens.

* **Real-Time Feedback via MetaMask:**  
  All write operations (register, grant, revoke, transfer) are signed with MetaMask. The UI surfaces:
  * Pending transaction state,
  * Success / failure messages,
  * And a direct reflection of updated contract state after confirmation.

* **Verifier Journey:**  
  A verifier can enter a vehicle DID + driver address and get an immediate “valid / invalid” response derived directly from the smart contract’s `verifyAccess` logic.


## Future Work

* **Mainnet / L2 Deployment:**  
  Migrate the prototype to a production-ready environment (e.g., Ethereum mainnet or L2) and benchmark gas usage under realistic workloads.

* **IoT Integration:**  
  Connect on-chain authorization directly to vehicle hardware (e.g., smart locks) so `grantAccess` / `revokeAccess` can physically unlock/lock the car.

* **Mobile Wallet UX:**  
  Build a dedicated mobile interface for drivers to store their VCs, request access, and present proofs at checkpoints/gates.


## Team (Group 14)

| Member | Role | Responsibilities |
|-------|------|------------------|
| **Jemil Dharia** | Backend & Blockchain | Smart contract design/implementation, Hardhat configuration, testnet deployments |
| **Shubh Kapadia** | Frontend & Integration | React UI, Ethers.js/MetaMask wiring, IPFS metadata linking |
| **Manav Patel** | Backend, Testing & Optimization | Wallet integration, Smart contract development, Unit and integration testing, gas profiling, edge-case validation |
| **Saurin Prajapati** | Backend, Docs & QA | Smart contract implementation support; repo/docs; deploy scripts; System testing and basic UAT; issues & release notes |

Team practices: weekly Google Meet at Fri 6 PM, mid-week Slack/GitHub async updates, daily syncs during final week. 

> **Note:** All reports and presentations will be collectively prepared by all members of our team.**
