export function Loader() {
  return (
    <>
      <style>{`
        @keyframes sq-fill {
          0%, 100% { background: transparent; }
          33%, 66% { background: #000; }
        }
        .savant-sq {
          width: 14px; height: 14px;
          border: 2.5px solid #000;
          animation: sq-fill 1.4s ease-in-out infinite;
        }
      `}</style>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
          width: "fit-content",
        }}
      >
        <div className="savant-sq" style={{ animationDelay: "0s" }} />
        <div className="savant-sq" style={{ animationDelay: "0.2s" }} />
        <div className="savant-sq" style={{ animationDelay: "0.6s" }} />
        <div className="savant-sq" style={{ animationDelay: "0.4s" }} />
      </div>
    </>
  );
}
