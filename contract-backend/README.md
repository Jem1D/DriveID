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


## Contract Overview
### **Contract Name:** `DriveID.sol`
(Ownable; emits transparent events; maintains  hashes / pointers of credentials on-chain; metadata on IPFS.)

#### Key Features:
- **Vehicle Registration:** Register vehicle DIDs and IPFS metadata hashes.
- **Access Management:** Provide and withdraw access rights to eligible drivers.
- **Verification:** Publicly verify whether a driver has legal access to a car.
- **Event Logging:** Emits events that are immutable (`VehicleRegistered`, `AccessGranted`, `AccessRevoked`) for transparency.


## Dependencies / Setup Instructions

### **Requirements**
- Node.js ≥ 18  
- Hardhat 2.27.0  
- OpenZeppelin Contracts 5.4.0  
- dotenv 17.2.3  

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

## Team (Group 14)

| Member | Role | Responsibilities |
|-------|------|------------------|
| **Jemil Dharia** | Backend & Blockchain | Smart contract design/implementation, Hardhat configuration, testnet deployments |
| **Shubh Kapadia** | Frontend & Integration | React UI, Ethers.js/MetaMask wiring, IPFS metadata linking |
| **Manav Patel** | Backend, Testing & Optimization | Wallet integration, Smart contract development, Unit and integration testing, gas profiling, edge-case validation |
| **Saurin Prajapati** | Backend, Docs & QA | Smart contract implementation support; repo/docs; deploy scripts; System testing and basic UAT; issues & release notes |

Team practices: weekly Google Meet at Fri 6 PM, mid-week Slack/GitHub async updates, daily syncs during final week. 

> **Note:** All reports and presentations will be collectively prepared by all members of our team.**


