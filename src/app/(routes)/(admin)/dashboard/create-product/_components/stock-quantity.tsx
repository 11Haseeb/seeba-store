import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

const StockQuantity = ({ control }: { control: Control }) => {
  return (
    <FormField
      control={control}
      name="stockQuantity"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Quantity</FormLabel>
          <Select
            required
            onValueChange={(value) => field.onChange(Number(value))}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Stock Quantity" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((item) => (
                <SelectItem key={item.toString()} value={item.toString()}>
                  {item} {item > 0 ? "+" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StockQuantity;
