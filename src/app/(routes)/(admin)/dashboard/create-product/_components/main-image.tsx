import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const MainImage = ({ control }: { control: any }) => {
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
