import React from "react";
import { Product } from "@prisma/client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteProduct from "./delete-product";

const ProductRow = ({ product }: { product: Product }) => {
  const { id, mainImage, name, price, discount, stockQuantity } = product;

  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarImage src={mainImage} />
          <AvatarFallback>S.S</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>
        {discount && discount > 0 ? (
          discount
        ) : (
          <span className="text-sm font-semibold opacity-70">None</span>
        )}
      </TableCell>
      <TableCell>
        {stockQuantity > 0 ? (
          <>{stockQuantity}+</>
        ) : (
          <span className="text-sm font-semibold opacity-70">
            Not Available
          </span>
        )}
      </TableCell>
      <TableCell>
        <DeleteProduct id={id} />
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
