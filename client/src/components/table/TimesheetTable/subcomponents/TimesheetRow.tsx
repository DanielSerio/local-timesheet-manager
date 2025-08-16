import type { PropsWithChildren } from "react";

export function Cell({
  children,
  label,
}: PropsWithChildren<{ label: string }>) {
  return (
    <div className="flex justify-between">
      <span className="label p-2">{label}</span>
      <span className="value p-2 min-w-[16ch] md:min-w-[fit-content] md:flex-1">
        {children}
      </span>
    </div>
  );
}

export function TableRow({
  children,
  gridTemplateColumns,
}: PropsWithChildren<{ gridTemplateColumns: string }>) {
  return (
    <div className="flex row border-b" style={{ gridTemplateColumns }}>
      {children}
    </div>
  );
}
