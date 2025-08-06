import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CancelGroupButtonProps } from "./CancelGroupButton.props";

export function CancelGroupButton({
  children,
  initButton: {
    buttonText: initButtonText,
    buttonIcon: InitIcon,
    ...initButton
  },
  isBusy,
  cancelButton,
  isExposed,
  setIsExposed,
}: CancelGroupButtonProps) {
  if (isExposed) {
    const cancelButtonProps = cancelButton ?? {};

    const {
      buttonText: cancelButtonText,
      buttonIcon: cancelButtonIcon,
      ...cancelProps
    } = cancelButtonProps;
    return (
      <span className="inline-flex items-center gap-x-2">
        <Button
          {...cancelProps}
          variant="secondary"
          disabled={isBusy || cancelButton?.disabled}
          onClick={() => setIsExposed(false)}
        >
          <span className="text">{cancelButtonText ?? "Cancel"}</span>
          <span className="icon">{cancelButton?.buttonIcon ?? <X />}</span>
        </Button>
        {children}
      </span>
    );
  }

  return (
    <Button
      {...initButton}
      disabled={isBusy || initButton.disabled}
      onClick={() => setIsExposed(true)}
    >
      <span className="text">{initButtonText}</span>
      {!!InitIcon ? <>{InitIcon}</> : undefined}
    </Button>
  );
}
