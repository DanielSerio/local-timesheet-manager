import type { Input } from "@/components/ui/input";
import type { ChangeEvent, ComponentProps } from "react";

export type ParsedTime = {
  hour: number;
  minute: number;
};

export interface ParsedTimeInputValue {
  parsed: ParsedTime | null;
  textValue: string;
}

export interface TimeInputProps extends Omit<ComponentProps<typeof Input>, 'onChange' | 'value' | 'type'> {
  value?: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>, time: ParsedTimeInputValue) => void;
}