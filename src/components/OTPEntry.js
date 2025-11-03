import React, { useState } from "react";


export default function OTPEntry({ phone, onVerify, onBack }) {
  const [otp, setOtp] = useState("");

  function handleVerify() {
    if (otp === "123456") onVerify();
    else alert("Wrong OTP. Use 123456 for demo.");
  }

  return (
    <div className="card center-card">
      <h2>Enter OTP</h2>
      <p>OTP sent to {phone}</p>

      <input
        type="text"
        placeholder="123456"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="input"
      />

      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button className="btn" onClick={handleVerify}>
          Verify
        </button>
        <button className="btn outline" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
