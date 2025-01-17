import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsSortDropdown = ({
  setSort,
}: {
  setSort: (value: string) => void;
}) => {
  const options = [
    { label: "Latest", value: "desc" },
    { label: "Oldest", value: "asc" },
    { label: "Price (High-to-Low)", value: "high-to-low" },
    { label: "Price (Low-to-High)", value: "low-to-high" },
  ];

  return (
    <Select onValueChange={setSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => {
          return (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ProductsSortDropdown;
