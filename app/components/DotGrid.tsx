const DotGrid = () => (
  <svg
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    <defs>
      <pattern
        id="dots"
        x="0"
        y="0"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="1" cy="1" r="1" fill="var(--fg-primary)" opacity="0.2" />
      </pattern>
      <radialGradient id="dots-fade" cx="50%" cy="50%" r="70%">
        <stop offset="20%" stopOpacity="1" stopColor="white" />
        <stop offset="100%" stopOpacity="0" stopColor="white" />
      </radialGradient>
      <mask id="dots-mask">
        <rect width="100%" height="100%" fill="url(#dots-fade)" />
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" mask="url(#dots-mask)" />
  </svg>
);

export default DotGrid;
