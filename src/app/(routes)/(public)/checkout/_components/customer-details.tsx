"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

const BasicDetails = ({ control }: { control: Control<any> }) => {
  const { user } = useUser();

  const inputFields = [
    {
      name: "customerName",
      label: "Name",
      placeholder: "Your name..",
      type: "text",
      defaultValue: user?.fullName,
    },
    {
      name: "customerEmail",
      label: "Email",
      placeholder: "Your email..",
      type: "email",
      defaultValue: user?.emailAddresses[0].emailAddress,
    },
    {
      name: "phone",
      label: "Phone",
      placeholder: "Your phone..",
      type: "tel",
      defaultValue: "",
    },
  ];

  return inputFields.map(({ name, label, placeholder, type, defaultValue }) => {
    return (
      <FormField
        key={name}
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>
                {label}{" "}
                {label === "Email" && (
                  <span className="text-sm opacity-80">(Optional)</span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type={type}
                  placeholder={placeholder}
                  required={label === "Email" ? false : true}
                  {...field}
                  value={field.value || defaultValue}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  });
};

export default BasicDetails;
