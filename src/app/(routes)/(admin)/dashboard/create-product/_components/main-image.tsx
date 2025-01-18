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

const MainImage = ({ control }: { control: Control }) => {
  return (
    <FormField
      control={control}
      name="mainImage"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Upload Image</FormLabel>
          <FormControl>
            <Input
              type="file"
              required
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MainImage;
