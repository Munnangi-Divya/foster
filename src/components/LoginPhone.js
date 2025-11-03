import React, { useState } from "react";


export default function LoginPhone({ onNext }) {
  const [phone, setPhone] = useState("");

  function handleSend() {
    if (!phone || phone.trim().length < 6) return alert("Enter a valid mobile number");
    onNext(phone.trim());
  }

  return (
    <div className="card center-card">
      <h2>Welcome</h2>
      <p>Enter your mobile number</p>

      <input
        type="tel"
        inputMode="numeric"
        placeholder="eg. 9876543210"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input"
      />

      <button className="btn" onClick={handleSend}>
        Send OTP
      </button>

      <small className="muted">
        Demo OTP: <strong>123456</strong>
      </small>
    </div>
  );
}
