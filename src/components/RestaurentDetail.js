import React, { useEffect, useRef, useState } from "react";


export default function RestaurantDetail({ restaurant, onBack }) {
  const logoSrc = "/Section.png";
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const [pos, setPos] = useState({ xPct: 50, yPct: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, orig: null });
  const [bgImage, setBgImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);

  
  useEffect(() => {
    const bg = new Image();
    bg.crossOrigin = "anonymous";
    bg.src = restaurant.image;
    bg.onload = () => setBgImage(bg);

    const lg = new Image();
    lg.crossOrigin = "anonymous";
    lg.src = logoSrc;
    lg.onload = () => setLogoImage(lg);
  }, [restaurant.image]);

  function handlePointerDown(e) {
    const rect = imgRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
    dragRef.current = { startX: clientX, startY: clientY, orig: { ...pos }, rect };
    setIsDragging(true);
    e.preventDefault();
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY);
    const { startX, startY, orig, rect } = dragRef.current;
    const dx = clientX - startX;
    const dy = clientY - startY;
    const newXpx = (orig.xPct / 100) * rect.width + dx;
    const newYpx = (orig.yPct / 100) * rect.height + dy;

    const clampedX = Math.max(0, Math.min(rect.width, newXpx));
    const clampedY = Math.max(0, Math.min(rect.height, newYpx));
    setPos({ xPct: (clampedX / rect.width) * 100, yPct: (clampedY / rect.height) * 100 });
  }

  function handlePointerUp() {
    setIsDragging(false);
  }

  
  function compositeAndShare() {
    if (!bgImage || !logoImage) return alert("Images still loading, try again shortly");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    
    canvas.width = bgImage.naturalWidth || bgImage.width;
    canvas.height = bgImage.naturalHeight || bgImage.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    
    const scale = 0.25; 
    const logoMax = Math.min(canvas.width, canvas.height) * scale;
    const aspect = logoImage.width / logoImage.height;
    let lw = logoMax;
    let lh = logoMax / aspect;
    if (lh > logoMax) {
      lh = logoMax;
      lw = logoMax * aspect;
    }

    const x = (pos.xPct / 100) * canvas.width - lw / 2;
    const y = (pos.yPct / 100) * canvas.height - lh / 2;

    ctx.drawImage(logoImage, x, y, lw, lh);

    
    ctx.font = `${Math.round(canvas.width * 0.02)}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("fastor", 10, canvas.height - 10);


    canvas.toBlob(async (blob) => {
      if (!blob) return alert("Failed to prepare image");

      const fileName = `${restaurant.name.replace(/\s+/g, "_")}.png`;
      const filesArray = [new File([blob], fileName, { type: blob.type })];

      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        try {
          await navigator.share({
            files: filesArray,
            title: `Share: ${restaurant.name}`,
            text: "Check this place out!"
          });
          return;
        } catch (err) {
          
        }
      }

      
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <div className="page">
      <header className="topbar">
        <button className="btn outline" onClick={onBack}>
          ← Back
        </button>
        <div>
          <h2>{restaurant.name}</h2>
          <p className="muted">{restaurant.description}</p>
        </div>
        <div />
      </header>

      <main className="container detail">
        <div
          className="image-frame"
          ref={imgRef}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <img src="https://plus.unsplash.com/premium_photo-1666174933753-36abe3cb834b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=689" alt={restaurant.name} className="bg-img" />

          <img
            src={logoSrc}
            alt="fastor"
            className={`overlay-logo ${isDragging ? "dragging" : ""}`}
            style={{ left: `${pos.xPct}%`, top: `${pos.yPct}%`, transform: "translate(-50%,-50%)" }}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            draggable={false}
          />

          <div className="hint">
            Drag to reposition logo. Tap "Share / Download Image" when ready.
          </div>
        </div>

        <div className="controls">
          <button className="btn" onClick={compositeAndShare}>
            Share / Download Image
          </button>
          <button
            className="btn outline"
            onClick={() => {
              setPos({ xPct: 50, yPct: 50 });
            }}
          >
            Reset Logo
          </button>

          <div className="muted" style={{ marginLeft: 8 }}>
            Position: {Math.round(pos.xPct)}% , {Math.round(pos.yPct)}%
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </main>
    </div>
  );
}
