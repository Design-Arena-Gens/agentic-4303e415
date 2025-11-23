import type { SVGProps } from "react";

export function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 11a2 2 0 1 1 2-2 3 3 0 0 0 3 3 3 3 0 0 1 3 3h0a3 3 0 0 0 3 3 2 2 0 1 1-2 2 3 3 0 0 0-3-3h0a3 3 0 0 1-3-3 3 3 0 0 0-3-3Z" />
      <path d="M16 5.373a2 2 0 1 1 2-2A2.5 2.5 0 0 0 20.5 5.873a2.5 2.5 0 0 1 2.5 2.5h0a2.5 2.5 0 0 0 2.5 2.5 2 2 0 1 1-2 2 2.5 2.5 0 0 0-2.5-2.5h0a2.5 2.5 0 0 1-2.5-2.5 2.5 2.5 0 0 0-2.5-2.5Z" />
    </svg>
  );
}
