import React, { useEffect, useState } from "react";
import { fetchNearbyRestaurants } from "../api";


export default function RestaurantsList({ onSelect }) {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchNearbyRestaurants().then((data) => {
      if (!mounted) return;
      setList(data);
      setLoading(false);
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1>Discover</h1>
          <p className="muted">Nearby restaurants</p>
        </div>
        <div />
      </header>

      <main className="container">
        {loading && <div className="loader">Loading...</div>}

        {!loading && (
          <div className="list">
            {list.map((r) => (
              <div key={r.id} className="card item" onClick={() => onSelect(r)}>
                <div className="thumb" style={{ backgroundImage: `url(${r.image})` }} />
                <div className="info">
                  <h3>{r.name}</h3>
                  <p className="muted">{r.description}</p>

                  <div className="meta">
                    <span>{r.distance}</span>
                    <button
                      className="btn small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(r);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
