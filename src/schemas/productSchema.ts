import { z } from "zod";

const ProductSchema = z.object({
  mainImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Main image must be a valid image file",
    }),
  optionalImages: z.array(
    z
      .instanceof(File)
      .refine((file) => file.type.startsWith("image/"), {
        message: "Optional images must be valid image files",
      })
  ),
  name: z.string().nonempty("Name is required"), // Unique and non-empty string
  description: z.string().nonempty("Description is required"), // Optional string
  price: z.coerce.number().int().min(0, "Price must be a positive integer"), // Positive integer
  discount: z.coerce
    .number()
    .int()
    .min(0, "Discount must be a positive integer")
    .optional(),
  stockQuantity: z.coerce
    .number()
    .int()
    .min(0, "Stock quantity must be a positive integer"), // Positive integer
  category: z.string().nonempty("Category is required"),
  message: z.string().optional(), // Optional string
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;

export default ProductSchema;
