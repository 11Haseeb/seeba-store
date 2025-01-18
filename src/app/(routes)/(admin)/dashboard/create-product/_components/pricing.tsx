import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

const Pricing = ({ control }: { control: Control }) => {
  return (
    <div className="grid grid-cols-2 gap-2 lg:gap-4">
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                placeholder="Product price.."
                type="number"
                required
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="discount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Discount <span className="text-sm opacity-70">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Product discount.."
                type="number"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Pricing;
