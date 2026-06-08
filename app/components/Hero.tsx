export function Hero() {
  return (
    <section
      className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 border-b-2 border-b-black"
      style={{
        backgroundColor: "#cde8a8",
        backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px),
          radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)
        `,
        backgroundSize: "22px 22px",
        backgroundPosition: "0 0, 11px 11px",
      }}
    >
      <h1
        className="mt-3 relative inline-block pb-4 text-[52px] font-black tracking-tight sm:text-6xl lg:text-[80px]"
        style={{ color: "var(--fg-primary)" }}
      >
        Savant
        <svg
          viewBox="0 0 360 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 bottom-0 w-full overflow-visible"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M4 13 C30 7 65 17 105 10 C140 4 178 15 218 9 C252 4 282 14 322 8 C338 6 349 12 356 9"
            stroke="#2d6e2d"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 16 C40 13 78 18 118 14 C155 11 190 17 228 13 C260 10 292 16 330 13"
            stroke="#2d6e2d"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
      </h1>

      <p
        className="mt-5 max-w-lg text-[17px] font-medium leading-relaxed"
        style={{ color: "var(--fg-muted)" }}
      >
        A community blog where everyone has a chance to share their knowledge —
        a platform for collaboration, learning, and the exchange of ideas.
      </p>
    </section>
  );
}
