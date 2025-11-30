import { useState } from "react";
import {
  connectWallet,
  registerVehicle,
  grantAccess,
  revokeAccess,
  verifyAccess,
  transferOwnership,
  getVehicle,
} from "./ethereum";

/* ---------- Error Parser ---------- */
const parseError = (err) => {
  if (!err) return "Unknown error";
  if (err.reason) return err.reason;
  if (err.info?.error?.message) return err.info.error.message;
  if (err.error?.message) return err.error.message;
  if (err.data?.message) return err.data.message;

  try {
    if (err.message.includes("reverted:")) {
      return err.message.split("reverted:")[1].replace(/"/g, "").trim();
    }
  } catch (_) {}

  return err.message || "Transaction failed";
};

function App() {
  const [wallet, setWallet] = useState("");

  const [vehicleDID, setVehicleDID] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const [grantDID, setGrantDID] = useState("");
  const [driver, setDriver] = useState("");
  const [credHash, setCredHash] = useState("");
  const [expiry, setExpiry] = useState("");

  const [verifyDid, setVerifyDid] = useState("");
  const [verifyDriver, setVerifyDriver] = useState("");

  const [ownerLookupDID, setOwnerLookupDID] = useState("");

  const [revokeDID, setRevokeDID] = useState("");
  const [revokeDriver, setRevokeDriver] = useState("");

  const [transferDID, setTransferDID] = useState("");
  const [newOwner, setNewOwner] = useState("");

  const connect = async () => {
    try {
      const addr = await connectWallet();
      setWallet(addr);
    } catch (err) {
      alert(parseError(err));
    }
  };

  const handleRegister = async () => {
    try {
      if (!vehicleDID || !ipfsHash) return alert("Fill all fields");
      await registerVehicle(vehicleDID, ipfsHash);
      alert("Vehicle registered!");
    } catch (err) {
      alert(parseError(err));
    }
  };

  const handleGrant = async () => {
    try {
      if (!grantDID || !driver || !credHash || !expiry)
        return alert("Fill all fields");

      const expiresAt = Math.floor(Date.now() / 1000) + Number(expiry) * 3600;

      await grantAccess(grantDID, driver, credHash, expiresAt);
      alert("Access granted!");
    } catch (err) {
      alert(parseError(err));
    }
  };

  const handleVerify = async () => {
  try {
    const [isValid, expiresAt, credentialHash] = await verifyAccess(
      verifyDid,
      verifyDriver
    );

    if (!isValid) return alert("Access Denied");

    const expiry = Number(expiresAt);  // convert BigInt → Number
    const expiryString = new Date(expiry * 1000).toLocaleString();

    alert(
      `Access Verified!\nExpires: ${expiryString}\nCredential Hash: ${credentialHash}`
    );
  } catch (err) {
    alert(parseError(err));
  }
};

  const handleOwnerLookup = async () => {
    try {
      if (!ownerLookupDID) return alert("Enter Vehicle DID");

      const vehicle = await getVehicle(ownerLookupDID);

      if (!vehicle.exists) return alert("Vehicle not registered");

      alert(`Owner: ${vehicle.owner}`);
    } catch (err) {
      alert(parseError(err));
    }
  };

  const handleRevoke = async () => {
    try {
      if (!revokeDID || !revokeDriver)
        return alert("Enter DID & Driver");

      await revokeAccess(revokeDID, revokeDriver);
      alert("Access revoked!");
    } catch (err) {
      alert(parseError(err));
    }
  };

  const handleTransferOwnership = async () => {
    try {
      if (!transferDID || !newOwner)
        return alert("Enter DID & new owner");

      await transferOwnership(transferDID, newOwner);
      alert("Ownership transferred!");
    } catch (err) {
      alert(parseError(err));
    }
  };

  /* ---------- UI ---------- */
  return (
    <div
      style={{
        padding: "55px",
        background: "#141414",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",       // <-- Centers horizontally
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        DriveID Dashboard
      </h1>

      {/* Connect Wallet */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
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

      <hr style={{ borderColor: "#333", width: "100%" }} />

      <div style={{ width: "100%", maxWidth: "500px", marginTop: "30px" }}>
        {/* Register Vehicle */}
        <h2>Register Vehicle</h2>
        <input placeholder="Vehicle DID" onChange={(e) => setVehicleDID(e.target.value)} style={inputStyle} />
        <input placeholder="IPFS Hash" onChange={(e) => setIpfsHash(e.target.value)} style={inputStyle} />
        <button style={btnStyle} onClick={handleRegister}>Register</button>

        <hr style={{ borderColor: "#333", margin: "25px 0" }} />

        {/* Grant Access */}
        <h2>Grant Access</h2>
        <input placeholder="Vehicle DID" onChange={(e) => setGrantDID(e.target.value)} style={inputStyle} />
        <input placeholder="Driver Address" onChange={(e) => setDriver(e.target.value)} style={inputStyle} />
        <input placeholder="Credential Hash" onChange={(e) => setCredHash(e.target.value)} style={inputStyle} />
        <input placeholder="Expiry (hours from now)" onChange={(e) => setExpiry(e.target.value)} style={inputStyle} />
        <button style={btnStyle} onClick={handleGrant}>Grant Access</button>

        <hr style={{ borderColor: "#333", margin: "25px 0" }} />

        {/* Verify */}
        <h2>Verify Access</h2>
        <input placeholder="Vehicle DID" onChange={(e) => setVerifyDid(e.target.value)} style={inputStyle} />
        <input placeholder="Driver Address" onChange={(e) => setVerifyDriver(e.target.value)} style={inputStyle} />
        <button style={btnStyle} onClick={handleVerify}>Verify</button>

        <hr style={{ borderColor: "#333", margin: "25px 0" }} />

        {/* Revoke */}
        <h2>Revoke Access</h2>
        <input placeholder="Vehicle DID" onChange={(e) => setRevokeDID(e.target.value)} style={inputStyle} />
        <input placeholder="Driver Address" onChange={(e) => setRevokeDriver(e.target.value)} style={inputStyle} />
        <button style={{ ...btnStyle, background: "#E8534F" }} onClick={handleRevoke}>Revoke Access</button>

        <hr style={{ borderColor: "#333", margin: "25px 0" }} />

        {/* Find Owner */}
        <h2>Find Vehicle Owner</h2>
        <input placeholder="Vehicle DID" onChange={(e) => setOwnerLookupDID(e.target.value)} style={inputStyle} />
        <button style={btnStyle} onClick={handleOwnerLookup}>Find Owner</button>

        <hr style={{ borderColor: "#333", margin: "25px 0" }} />

        {/* Transfer */}
        <h2>Transfer Ownership</h2>
        <input placeholder="Vehicle DID" onChange={(e) => setTransferDID(e.target.value)} style={inputStyle} />
        <input placeholder="New Owner Address" onChange={(e) => setNewOwner(e.target.value)} style={inputStyle} />
        <button style={{ ...btnStyle, background: "#FFAA33" }} onClick={handleTransferOwnership}>
          Transfer Ownership
        </button>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
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
