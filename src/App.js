import React, { useEffect, useState } from "react";
import LoginPhone from "./components/LoginPhone";
import OTPEntry from "./components/OTPEntry";
import RestaurantsList from "./components/RestaurentsList";
import RestaurantDetail from "./components/RestaurentDetail";
import '../src/style.css';


export default function App() {
  const [route, setRoute] = useState("login");
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) setRoute("login");
    else if (!selected) setRoute("list");
    else setRoute("detail");
  }, [isLoggedIn, selected]);

  useEffect(() => {
    
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          
        });
      });
    }
  }, []);

  return (
    <div className="app">
      {route === "login" && (
        <LoginPhone
          onNext={(p) => {
            setPhone(p);
            setRoute("otp");
          }}
        />
      )}

      {route === "otp" && (
        <OTPEntry
          phone={phone}
          onVerify={() => {
            setIsLoggedIn(true);
            setRoute("list");
          }}
          onBack={() => setRoute("login")}
        />
      )}

      {route === "list" && (
        <RestaurantsList
          onSelect={(r) => {
            setSelected(r);
          }}
        />
      )}

      {route === "detail" && selected && (
        <RestaurantDetail
          restaurant={selected}
          onBack={() => setSelected(null)}
        />
      )}

      <footer className="footer muted">Built for demo — Fastor overlay & PWA-ready.</footer>
    </div>
  );
}
