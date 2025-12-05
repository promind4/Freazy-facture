import * as React from "react";

import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface AutocompleteProps<T> {
    value: string;
    onChange: (value: string) => void;
    onSelect: (item: T) => void;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    getItemValue: (item: T) => string;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
}

export function Autocomplete<T>({
    value,
    onChange,
    onSelect,
    items,
    renderItem,
    getItemValue,
    placeholder,
    emptyMessage = "No results found.",
    className
}: AutocompleteProps<T>) {
    const [open, setOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleSelect = (item: T) => {
        onSelect(item);
        setOpen(false);
    };

    return (
        <div className={cn("relative", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative w-full">
                        <Input
                            ref={inputRef}
                            value={value}
                            onChange={(e) => {
                                onChange(e.target.value);
                                setOpen(true);
                            }}
                            onFocus={() => setOpen(true)}
                            placeholder={placeholder}
                            className="w-full"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 w-[--radix-popover-trigger-width]"
                    align="start"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <Command className="w-full">
                        <CommandList>
                            {items.length === 0 && (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    {emptyMessage}
                                </div>
                            )}
                            {items.length > 0 && (
                                <CommandGroup>
                                    {items.map((item, index) => (
                                        <CommandItem
                                            key={index}
                                            value={getItemValue(item)}
                                            onSelect={() => handleSelect(item)}
                                            className="cursor-pointer"
                                        >
                                            {renderItem(item)}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
