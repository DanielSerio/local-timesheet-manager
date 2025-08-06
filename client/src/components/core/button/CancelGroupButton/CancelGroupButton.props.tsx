import type { Button } from "@/components/ui/button";
import type {
  ComponentProps,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from "react";

type ButtonProps = ComponentProps<typeof Button> & {
  buttonText: string;
  buttonIcon?: ReactNode;
};

export interface CancelGroupButtonProps extends PropsWithChildren {
  initButton: ButtonProps;
  cancelButton?: Partial<ButtonProps>;
  isBusy?: boolean;
  isExposed: boolean;
  setIsExposed: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
}
