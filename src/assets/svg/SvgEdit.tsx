import * as React from "react";

export const SvgEdit: React.FC<ISvg> = ({ width, height, onClick }) => {
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 25 25"
      fill="none"
      onClick={onClick}
    >
      <path
        d="M25 12.5C25 5.596 19.404 0 12.5 0S0 5.596 0 12.5 5.596 25 12.5 25 25 19.404 25 12.5z"
        fill="url(#prefix__paint0_linear)"
      />
      <path
        d="M4.605 16.968v3.427h3.427l10.112-10.112-3.427-3.427L4.605 16.968zM20.785 6.348l-2.134-2.133a.916.916 0 00-1.293 0l-1.672 1.672 3.427 3.427 1.672-1.672a.916.916 0 000-1.294z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={12.5}
          y1={-13.71}
          x2={24.443}
          y2={27.328}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8BFFA5" />
          <stop offset={1} stopColor="#00C02A" />
        </linearGradient>
      </defs>
    </svg>
  );
};
