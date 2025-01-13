"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

interface SelectFieldOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectFieldOption[];
  disabled?: boolean;
}

const SearchableSelect: React.FC<SelectFieldProps> = ({
  control,
  name,
  label,
  options,
  placeholder,
  disabled,
}: SelectFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <SearchableInput
              placeholder={placeholder}
              options={options}
              field={field}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type SearchableSelectProps = {
  placeholder?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  field: any; // This is the field object from `react-hook-form`
};

const SearchableInput = ({
  placeholder,
  options,
  field,
  disabled,
}: SearchableSelectProps) => {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Select
      disabled={disabled}
      onValueChange={field.onChange}
      defaultValue={field.value || ""}
    >
      <SelectTrigger className="w-full disabled:text-black disabled:opacity-1">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
        </div>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-sm text-gray-500">No results found</div>
        )}
      </SelectContent>
    </Select>
  );
};
export default SearchableSelect;
