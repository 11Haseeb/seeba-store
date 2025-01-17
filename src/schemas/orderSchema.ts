import { z } from "zod";

// Define the Order schema
const OrderSchema = z.object({
  customerName: z.string().nonempty("Customer name is required"),
  customerEmail: z.string().email("Invalid email address").optional(),
  phone: z.string().nonempty("Phone number is required"),

  province: z.string().nonempty("Province is required"),
  city: z.string().nonempty("City is required"),
  area: z.string().nonempty("Area is required"),
  street: z.string().nonempty("Street is required"),
  house: z.string().nonempty("House is required"),
  zipCode: z.string().nonempty("Zip code is required").optional(),
});

export type OrderSchemaType = z.infer<typeof OrderSchema>;

export { OrderSchema };
