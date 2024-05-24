export default function SvgGrid() {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
    >
      <defs>
        <pattern
          id="smallGrid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="lightblue"
            strokeWidth="0.5"
            className="stroke-slate-300 dark:stroke-slate-700"
          />
        </pattern>
        <pattern
          id="grid"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="100" fill="url(#smallGrid)" />
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}
