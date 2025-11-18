import { useState } from "react";
import {
  connectWallet,
  registerVehicle,
  grantAccess,
  revokeAccess,
  verifyAccess,
} from "./ethereum";

function App() {
  const [wallet, setWallet] = useState("");

  // Register
  const [vehicleDID, setVehicleDID] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  // Grant
  const [grantDID, setGrantDID] = useState("");
  const [driver, setDriver] = useState("");
  const [credHash, setCredHash] = useState("");

  // Revoke
  const [revokeDID, setRevokeDID] = useState("");

  // Verify
  const [verifyDid, setVerifyDid] = useState("");
  const [verifyDriver, setVerifyDriver] = useState("");

  const connect = async () => {
    try {
      const addr = await connectWallet();
      setWallet(addr);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async () => {
    await registerVehicle(vehicleDID, ipfsHash);
    alert("Vehicle registered!");
  };

  const handleGrant = async () => {
    if (!grantDID) return alert("Please enter Vehicle DID");
    await grantAccess(grantDID, driver, credHash);
    alert("Access granted!");
  };

  const handleRevoke = async () => {
    if (!revokeDID) return alert("Please enter Vehicle DID to revoke");
    await revokeAccess(revokeDID);
    alert("Access revoked!");
  };

  const handleVerify = async () => {
    const result = await verifyAccess(verifyDid, verifyDriver);
    alert(result ? "Access Verified!" : "Access Denied");
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#141414",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        🚗 DriveID Dashboard
      </h1>

      {/* Connect Wallet */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={connect}
          style={{
            padding: "10px 20px",
            background: "#5A6FF0",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Connect MetaMask
        </button>
        <div style={{ opacity: 0.8 }}>
          Wallet: {wallet || "Not connected"}
        </div>
      </div>

      <hr style={{ borderColor: "#333" }} />

      {/* Container */}
      <div style={{ maxWidth: "500px", marginTop: "30px" }}>
        {/* Register Vehicle */}
        <h2 style={{ marginBottom: "10px" }}>Register Vehicle</h2>

        <input
          placeholder="Vehicle DID"
          onChange={(e) => setVehicleDID(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="IPFS Hash"
          onChange={(e) => setIpfsHash(e.target.value)}
          style={inputStyle}
        />

        <button style={btnStyle} onClick={handleRegister}>
          Register
        </button>

        <hr style={{ borderColor: "#333", margin: "25px 0" }} />

        {/* Grant Access */}
        <h2 style={{ marginBottom: "10px" }}>Grant Access</h2>

        <input
          placeholder="Vehicle DID"
          onChange={(e) => setGrantDID(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Driver address"
          onChange={(e) => setDriver(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Credential Hash"
          onChange={(e) => setCredHash(e.target.value)}
          style={inputStyle}
        />

        <button style={btnStyle} onClick={handleGrant}>
          Grant Access
        </button>

        <hr style={{ borderColor: "#333", margin: "25px 0" }} />

        {/* Revoke Access */}
        <h2 style={{ marginBottom: "10px" }}>Revoke Access</h2>

        <input
          placeholder="Vehicle DID"
          onChange={(e) => setRevokeDID(e.target.value)}
          style={inputStyle}
        />

        <button
          style={{
            ...btnStyle,
            background: "#E8534F",
          }}
          onClick={handleRevoke}
        >
          Revoke Access
        </button>

        <hr style={{ borderColor: "#333", margin: "25px 0" }} />

        {/* Verify */}
        <h2 style={{ marginBottom: "10px" }}>Verify Access</h2>

        <input
          placeholder="Vehicle DID"
          onChange={(e) => setVerifyDid(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Driver Address"
          onChange={(e) => setVerifyDriver(e.target.value)}
          style={inputStyle}
        />

        <button style={btnStyle} onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
}

/* ----------- Styles ---------- */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #333",
  background: "#1F1F1F",
  color: "white",
};

const btnStyle = {
  padding: "10px 20px",
  background: "#5A6FF0",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "5px",
};

export default App;
