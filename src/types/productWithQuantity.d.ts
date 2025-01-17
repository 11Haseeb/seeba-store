import { Product } from "@prisma/client";

export class ProductWithQuantity extends Product {
  quantity: number;
}
