import type { PropsWithChildren } from "react";

export function PageTitle({
  text,
  children,
}: PropsWithChildren<{ text: string }>) {
  return (
    <div className="py-6 flex flex-col justify-center align-center md:flex-row md:justify-between">
      <div className="w-full md:flex-1">
        <h1 className="text-2xl font-normal text-center md:text-left mb-4 md:mb-0">
          {text}
        </h1>
      </div>
      {!!children && <span>{children}</span>}
    </div>
  );
}
