import { Button } from "@/components/ui/button";
import type { AsyncButtonProps } from "./AsyncButton.props";

export function AsyncButton({
  children,
  isBusy,
  disabled,
  rightSection,
  ...props
}: AsyncButtonProps) {
  const shouldRenderIcon = typeof rightSection === "function" || isBusy;
  const isDisabled = disabled || isBusy;

  return (
    <Button disabled={isDisabled ?? undefined} {...props}>
      <span className="text-sm">{children}</span>
      {shouldRenderIcon && (
        <span className="ml-2">{isBusy ? "..." : rightSection?.()}</span>
      )}
    </Button>
  );
}
