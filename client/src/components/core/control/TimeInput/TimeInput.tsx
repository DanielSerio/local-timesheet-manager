import {
  forwardRef,
  useCallback,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type ForwardedRef,
} from "react";
import type { ParsedTime, TimeInputProps } from "./TimeInput.props";
import { Input } from "@/components/ui/input";

function parseTime(date: Date | null): ParsedTime | null {
  if (date && date.toString() !== "Invalid Date") {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }

  return null;
}

function roundValue(value: Date | null): null | string {
  if (!value) {
    return null;
  }

  let minutes = value.getUTCMinutes();

  minutes = Math.round(minutes / 15) * 15;

  if (minutes === 60) {
    minutes = 0;
  }

  return `${`${value.getUTCHours()}`.padStart(2, "0")}:${`${minutes}`.padStart(
    2,
    "0"
  )}`;
}

function TimeInputComponent(
  { value, style, onChange, onBlur, ...props }: TimeInputProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const [inputValue, setInputValue] = useState<null | string>(value ?? null);

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      onChange(ev, {
        textValue: ev.target.value,
        parsed: parseTime(ev.target.valueAsDate),
      });
      setInputValue(ev.target.value);
    },
    [onChange, setInputValue]
  );

  const handleBlur = useCallback(
    (ev: FocusEvent<HTMLInputElement>) => {
      onChange(ev, {
        textValue: roundValue(ev.target.valueAsDate) ?? ev.target.value,
        parsed: parseTime(ev.target.valueAsDate),
      });
      setInputValue(roundValue(ev.target.valueAsDate));
      onBlur?.({
        ...ev,
        target: {
          ...ev.target,
          value: roundValue(ev.target.valueAsDate) ?? "",
        },
      });
    },
    [value]
  );

  return (
    <Input
      type="time"
      ref={ref}
      style={
        style
          ? { ...style, appearance: "textfield" }
          : { appearance: "textfield" }
      }
      value={inputValue ?? ""}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
}

export const TimeInput = forwardRef(TimeInputComponent);
