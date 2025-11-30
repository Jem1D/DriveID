// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DriveID {

    struct Vehicle {
        address owner;
        string vehicleDID;
        string ipfsHash;
        bool exists;
    }

    struct Credential {
        address issuer;
        address driver;
        string credentialHash;
        uint256 issuedAt;
        uint256 expiresAt;
        bool revoked;
    }

    mapping(bytes32 => Vehicle) private vehicles;
    mapping(bytes32 => mapping(address => Credential)) private credentials;

    event VehicleRegistered(address indexed owner, string vehicleDID);
    event VehicleMetadataUpdated(address indexed owner, string vehicleDID, string newIpfsHash);
    event OwnershipTransferred(string vehicleDID, address indexed oldOwner, address indexed newOwner);
    event AccessGranted(string vehicleDID, address indexed owner, address indexed driver, uint256 expiresAt, string credentialHash);
    event AccessRevoked(string vehicleDID, address indexed owner, address indexed driver);

    modifier onlyOwner(string memory vehicleDID) {
        require(vehicles[_key(vehicleDID)].owner == msg.sender, "Not owner");
        _;
    }

    function _key(string memory vehicleDID) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(vehicleDID));
    }

    function registerVehicle(string calldata vehicleDID, string calldata ipfsHash) external {
        bytes32 key = _key(vehicleDID);
        require(!vehicles[key].exists, "Vehicle exists");
        require(bytes(vehicleDID).length > 0, "Invalid DID");

        vehicles[key] = Vehicle(msg.sender, vehicleDID, ipfsHash, true);
        emit VehicleRegistered(msg.sender, vehicleDID);
    }

    function updateVehicleMetadata(string calldata vehicleDID, string calldata newIpfsHash)
        external
        onlyOwner(vehicleDID)
    {
        vehicles[_key(vehicleDID)].ipfsHash = newIpfsHash;
        emit VehicleMetadataUpdated(msg.sender, vehicleDID, newIpfsHash);
    }

    function transferOwnership(string calldata vehicleDID, address newOwner)
        external
        onlyOwner(vehicleDID)
    {
        require(newOwner != address(0), "Invalid address");

        bytes32 key = _key(vehicleDID);
        address oldOwner = vehicles[key].owner;

        vehicles[key].owner = newOwner;
        emit OwnershipTransferred(vehicleDID, oldOwner, newOwner);
    }

    function grantAccess(
        string calldata vehicleDID,
        address driver,
        string calldata credentialHash,
        uint256 expiresAt
    )
        external
        onlyOwner(vehicleDID)
    {
        require(driver != address(0), "Invalid driver");
        require(expiresAt > block.timestamp, "Invalid expiry");

        bytes32 key = _key(vehicleDID);

        credentials[key][driver] = Credential(
            msg.sender,
            driver,
            credentialHash,
            block.timestamp,
            expiresAt,
            false
        );

        emit AccessGranted(vehicleDID, msg.sender, driver, expiresAt, credentialHash);
    }

    function revokeAccess(string calldata vehicleDID, address driver)
        external
        onlyOwner(vehicleDID)
    {
        bytes32 key = _key(vehicleDID);
        require(credentials[key][driver].driver != address(0), "No credential");

        credentials[key][driver].revoked = true;
        emit AccessRevoked(vehicleDID, msg.sender, driver);
    }

    function verifyAccess(string calldata vehicleDID, address driver)
        external
        view
        returns (bool isValid, uint256 expiresAt, string memory credentialHash)
    {
        bytes32 key = _key(vehicleDID);
        Credential memory cred = credentials[key][driver];

        bool valid = (
            cred.driver == driver &&
            !cred.revoked &&
            cred.expiresAt > block.timestamp
        );

        return (valid, cred.expiresAt, cred.credentialHash);
    }

    function getVehicle(string calldata vehicleDID)
        external
        view
        returns (Vehicle memory)
    {
        return vehicles[_key(vehicleDID)];
    }

    function getCredential(string calldata vehicleDID, address driver)
        external
        view
        returns (Credential memory)
    {
        return credentials[_key(vehicleDID)][driver];
    }
}
