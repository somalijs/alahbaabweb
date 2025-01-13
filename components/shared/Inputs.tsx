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
import { Input } from "@/components/ui/input";
interface SelectFieldProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const InputField: React.FC<SelectFieldProps> = ({
  control,
  name,
  label,
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
            <Input
              placeholder={placeholder}
              {...field}
              value={field.value || ""}
              disabled={disabled}
              className="disabled:text-black disabled:opacity-1"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
