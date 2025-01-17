import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const Message = ({ control }: { control: any }) => {
  return (
    <FormField
      control={control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Message <span className="text-sm opacity-70">(Optional)</span>
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder="Write a message to the customer"
              className="h-24"
              {...field}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Message;
