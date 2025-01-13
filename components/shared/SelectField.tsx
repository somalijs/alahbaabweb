"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

const SelectField: React.FC<SelectFieldProps> = ({
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
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || ""}
              disabled={disabled}
            >
              <SelectTrigger className="w-full disabled:text-black disabled:opacity-1">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
