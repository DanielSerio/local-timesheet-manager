import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { EntitySearchProps } from "./EntitySearch.props";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useCallback, useState, type ForwardedRef } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types/category.types";
import type { Subcategory } from "@/lib/types/subcategory.types";

function EntitySearchComponent<Type extends Category | Subcategory>(
  {
    defaultValue,
    entityName,
    options,
    isLoading,
    disabled,
    getOptionValue,
    getOptionLabel,
  }: EntitySearchProps<Type>,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const [isOpen, setIsOpen] = useState(false);
  const findOption = (id: number) =>
    options?.find((opt) => getOptionValue(opt) === id);
  const foundDefaultOption = defaultValue ? findOption(defaultValue) : null;
  const [filterText, setFilterText] = useState("");
  const [selected, setSelected] = useState<null | Type>(
    foundDefaultOption ?? null
  );

  const filterOptions = useCallback(() => {
    if (filterText === "") {
      return options ?? [];
    }
    return (options ?? []).filter(({ name }) =>
      name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  const commandOptions = filterOptions();
  const isDisabled = disabled || isLoading || false;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <input
        type="hidden"
        value={selected ? getOptionValue(selected) : ""}
        ref={ref}
      />
      <PopoverTrigger asChild>
        <Button
          disabled={isDisabled}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-between"
        >
          {selected
            ? getOptionLabel(selected)
            : isLoading
            ? "Loading..."
            : `Select ${entityName}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command
          filter={(value, search) => {
            const found = findOption(+value);

            if (found?.name.toLowerCase().includes(search.toLowerCase())) {
              return 1;
            }

            return 0;
          }}
        >
          <CommandInput
            placeholder={`Search ${entityName}...`}
            className="h-9"
            value={filterText}
            onValueChange={(search) => setFilterText(search)}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading..." : `No ${entityName} found.`}
            </CommandEmpty>
            <CommandGroup>
              {commandOptions.map((option) => (
                <CommandItem
                  key={getOptionValue(option)}
                  value={`${getOptionValue(option) ?? ""}`}
                  onSelect={(currentValue) => {
                    const found = findOption(+currentValue);

                    if (found) {
                      setSelected(found);
                      setIsOpen(false);
                    }
                  }}
                >
                  {getOptionLabel(option)}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected &&
                        getOptionValue(selected) === getOptionValue(option)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const EntitySearch = forwardRef(EntitySearchComponent);
