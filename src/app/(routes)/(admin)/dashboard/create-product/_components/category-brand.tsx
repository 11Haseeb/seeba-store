import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryBrand = ({ control }: { control: any }) => {
  const options = [
    "Accessories",
    "Gaming Combo",
    "Gaming Mouse",
    "Gaming Keyboard",
    "Gaming Headset",
    "Gaming Mousepad",
    "Gaming Chair",
    "Gaming Monitor",
    "Gaming Speakers",
    "Gaming Accessories",
  ];

  return (
    <div className="grid grid-cols-2 gap-2 lg:gap-4">
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              required
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => {
                  console.log(option);
                  return (
                    <SelectItem
                      key={option.toLowerCase().replace(" ", "-")}
                      value={option}
                    >
                      {option}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Brand <span className="text-sm opacity-70">(Optional)</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Product brand.."
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

export default CategoryBrand;
