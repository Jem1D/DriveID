// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DriveID
 * @notice Decentralized Vehicle Identity & Access Management
 * @dev Draft version for checkpoint submission.
 */

contract DriveID {
    struct Vehicle {
        address owner;
        string vehicleDID;
        string ipfsHash; // metadata: encrypted credential JSON
        bool exists;
    }

    struct Credential {
        address driver;
        string credentialHash;
        bool valid;
    }

    mapping(string => Vehicle) public vehicles;
    mapping(string => Credential) public credentials;

    event VehicleRegistered(address indexed owner, string vehicleDID);
    event AccessGranted(address indexed owner, address indexed driver, string vehicleDID);
    event AccessRevoked(address indexed owner, address indexed driver, string vehicleDID);

    modifier onlyOwner(string memory _vehicleDID) {
        require(vehicles[_vehicleDID].owner == msg.sender, "Not owner");
        _;
    }

    function registerVehicle(string memory _vehicleDID, string memory _ipfsHash) public {
        require(!vehicles[_vehicleDID].exists, "Vehicle exists");
        vehicles[_vehicleDID] = Vehicle(msg.sender, _vehicleDID, _ipfsHash, true);
        emit VehicleRegistered(msg.sender, _vehicleDID);
    }

    function grantAccess(string memory _vehicleDID, address _driver, string memory _credHash)
        public onlyOwner(_vehicleDID)
    {
        credentials[_vehicleDID] = Credential(_driver, _credHash, true);
        emit AccessGranted(msg.sender, _driver, _vehicleDID);
    }

    function revokeAccess(string memory _vehicleDID)
        public onlyOwner(_vehicleDID)
    {
        credentials[_vehicleDID].valid = false;
        emit AccessRevoked(msg.sender, credentials[_vehicleDID].driver, _vehicleDID);
    }

    function verifyAccess(string memory _vehicleDID, address _driver)
        public view returns (bool)
    {
        Credential memory cred = credentials[_vehicleDID];
        return (cred.driver == _driver && cred.valid);
    }
}
